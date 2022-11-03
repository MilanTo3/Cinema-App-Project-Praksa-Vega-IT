namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using static CryptoService;
using static EmailService;

public class UserService : IUserService
{

    private readonly IRepositoryManager _repositoryManager;
    public UserService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default) {
        var users = await _repositoryManager.userRepository.getAll();

        var accountsDto = users.Adapt<IEnumerable<UserDto>>();

        return accountsDto;
    }

    public async Task<UserDto> GetByIdAsync(long userid, CancellationToken cancellationToken) {
        var user = await _repositoryManager.userRepository.getById(userid);
        var userdto = user.Adapt<UserDto>();

        return userdto;
    }

    public async Task<UserDto> CreateAsync(UserDto user, CancellationToken cancellationToken = default) {

        var account = user.Adapt<User>();
        account.blocked = false;
        account.verified = false;
        account.role = "consumer";
        account.password = hashPassword(user.password);
        account.VerificationToken = createatoken();

        await _repositoryManager.userRepository.Add(account);
        await _repositoryManager.UnitOfWork.Complete();
        EmailService.sendVerificationEmail(account.email, account.VerificationToken);

        return account.Adapt<UserDto>();
    }

    public async Task<bool> RequestPassReset(string email, string text){

        var account = await _repositoryManager.userRepository.GetByEmail(email);
        bool request = false;

        if(account != null){
            account.PasswordResetToken = createatoken();
            account.password = "Invalid";
            request = await _repositoryManager.userRepository.Update(account);
            try{
                EmailService.sendPasswordResetMail(email, account.PasswordResetToken, text);
            }catch{
                return false;
            }
            await _repositoryManager.UnitOfWork.Complete();
        }

        return request;
    }

    public async Task<bool> ResetPassword(string email, string token, string newpassword){

        var account = await _repositoryManager.userRepository.GetByEmail(email);
        bool reseted = false;

        if(account != null){
            
            if(account.PasswordResetToken != token){
                return false;
            }

            account.PasswordResetToken = "";
            account.password = hashPassword(newpassword);
            reseted = await _repositoryManager.userRepository.Update(account);
            await _repositoryManager.UnitOfWork.Complete();

        }

        return reseted;
    }

    public async Task<bool> DeleteAsync(long userid, CancellationToken cancellationToken = default) {

        var account = await _repositoryManager.userRepository.getById(userid);
        bool deleted = false;

        if (account != null) {
            deleted = await _repositoryManager.userRepository.Delete(userid);

            await _repositoryManager.UnitOfWork.Complete();
        }

        return deleted;
    }

    public async Task<TokenDto> LoginUserAsync(LoginUserDto loginUser) {

        User user = await _repositoryManager.userRepository.LoginUserAsync(loginUser.email, loginUser.password);
        TokenDto tokendto = new TokenDto();

        if (user != null) {
            var hashedPasswordString = hashPassword(loginUser.password);

            if (user.verified == false) {
                tokendto.errorMessage = "Check your email for a verification link.";
                return tokendto;
            }
            else if (user.blocked) {
                tokendto.errorMessage = "Oops! Your account seems to be blocked!";
                return tokendto;
            }
            else if (user.password != hashedPasswordString) {
                tokendto.errorMessage = "Incorrect email or password.";
                return tokendto;
            }

            JWTSetting setting = new JWTSetting();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("userId", loginUser.email), new Claim(ClaimTypes.Role, user.role)
                    }),
                Expires = DateTime.UtcNow.AddHours(5), // token expires in 5 hours.
                                                       //Key min: 16 characters
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(setting.Key)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            
            TokenDto userDto = new TokenDto() { id = user.userId, name = user.name, email = user.email, role = user.role, token = tokenHandler.WriteToken(securityToken), errorMessage = "" };
            return userDto;
        }

        tokendto.errorMessage = "Incorrect email or password.";
        return tokendto;
    }

    public async Task<bool> VerifyUser(string email, string token) {

        var user = await _repositoryManager.userRepository.GetByEmail(email);
        
        if (user == null) {
            return false;
        }

        if (token != user.VerificationToken) {
            return false;
        }

        user.verified = true;
        bool updated = await _repositoryManager.userRepository.Update(user);
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

    public async Task<bool> BlockUser(long id) {

        var user = await _repositoryManager.userRepository.getById(id);
        if (user == null) {
            return false;
        }

        user.blocked = !user.blocked;
        bool changed = await _repositoryManager.userRepository.Update(user);
        await _repositoryManager.UnitOfWork.Complete();

        return changed;
    }

    public async Task<DtoPaginated<UserDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var userDto = await _repositoryManager.userRepository.GetPaginated(page, itemCount, letters, searchTerm);
        var usersDto = userDto.Data.Adapt<IEnumerable<UserDto>>().ToList();

        var sdto = new DtoPaginated<UserDto>(){Data = usersDto, ActualCount = userDto.ActualCount};

        return sdto;
    }
}