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

public class UserService : IUserService
{

    private readonly IRepositoryManager _repositoryManager;
    public UserService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;
    private const string pepper = "i love you";

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
        SHA256 hash = SHA256.Create();
        var hashedPasswordBytes = hash.ComputeHash(Encoding.Default.GetBytes(user.password + pepper));
        var hashedPasswordString = Convert.ToHexString(hashedPasswordBytes);
        account.password = hashedPasswordString;
        account.VerificationToken = createatoken();

        await _repositoryManager.userRepository.Add(account);
        await _repositoryManager.UnitOfWork.Complete();
        sendVerificationEmail(account.email, account.VerificationToken);

        return account.Adapt<UserDto>();
    }

    private void sendVerificationEmail(string userEmail, string token) {

        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("cinefracinema@gmail.com"));
        email.To.Add(MailboxAddress.Parse(userEmail));
        email.Subject = "Cinefra Account Verfication";
        string link = "http://localhost:5174/api/users/verify/" + userEmail + "/" + token;
        string anchortag = string.Format("<a href={0}>Confirm the registration.</a>", link);
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "" +
            "<h2>Hello new user!</h2><p>We welcome you to the Cinefra cinema family, last thing you need to do to complete the registration process is confirm the registration.</p>" + anchortag };

        using (var smtp = new SmtpClient()) {
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("cinefracinema@gmail.com", "xcqrblozlhgqreub");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }

    private string createatoken() {

        return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

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
            SHA256 hash = SHA256.Create();
            var hashedPasswordBytes = hash.ComputeHash(Encoding.Default.GetBytes(loginUser.password + pepper));
            var hashedPasswordString = Convert.ToHexString(hashedPasswordBytes);

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

            TokenDto userDto = new TokenDto() { id = user.userId, name = user.name, email = user.email, role = user.role, errorMessage = "" };
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
}
