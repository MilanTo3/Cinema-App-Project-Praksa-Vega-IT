namespace PresentationLayer.Controllers;
using System;
using System.Threading;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using ServicesAbstraction;
using ServiceLayer;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography.Xml;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public UserController(IServiceManager serviceManager){
        _serviceManager = serviceManager;
    }

    [HttpGet]
    [Route("getUsers")]
    public async Task<IActionResult> GetAccounts()
    {
        var usersDto = await _serviceManager.UserService.GetAllAsync();

        return Ok(usersDto);
    }

    [HttpPost]
    [Route("registerUser")]
    public async Task<IActionResult> AddUser(UserDto user){

        await _serviceManager.UserService.CreateAsync(user);

        return Ok();
    }

    [HttpPost]
    [Route("loginUser")]
    public async Task<IActionResult> LoginUser(LoginUserDto loginUser) {

        TokenDto user = await _serviceManager.UserService.LoginUserAsync(loginUser);

        if (user.errorMessage == "") {

            JWTSetting setting = new JWTSetting();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("userId", loginUser.email),
                    }),
                Expires = DateTime.UtcNow.AddHours(5), // token expires in 5 hours.
                                                       //Key min: 16 characters
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(setting.Key)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(securityToken);

            return Ok(user);
        }
        else {
            return BadRequest(user.errorMessage);
        }
    }

    [HttpGet]
    [Route("getuser/{id?}")]
    public async Task<IActionResult> GetUserByID(long id) {

        UserDto user = await _serviceManager.UserService.GetByIdAsync(id);

        return Ok(user);
    }

    [HttpDelete]
    [Route("delete/{id?}")]
    public async Task<IActionResult> DeleteUser(long id) {

        bool deleted = await _serviceManager.UserService.DeleteAsync(id);
        if (deleted) {
            return Ok();
        }
        else {
            return BadRequest();
        }

    }

    [HttpPatch]
    [Route("verify/{id}")]
    public async Task<IActionResult> VerifyUser(long id) {

        bool verified = await _serviceManager.UserService.VerifyUser(id);
        if (verified) {
            return Ok();
        }
        else {
            return NotFound();
        }
    }

    [HttpPatch]
    [Route("block/{id}")]
    public async Task<IActionResult> BlockUser(long id) {

        bool success = await _serviceManager.UserService.BlockUser(id);
        if (success) {
            return Ok();
        }
        else {
            return NotFound();
        }
    }

}
