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
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public UserController(IServiceManager serviceManager){
        _serviceManager = serviceManager;
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("getUsers")]
    public async Task<IActionResult> GetAccounts()
    {
        var usersDto = await _serviceManager.UserService.GetAllAsync();

        return Ok(usersDto);
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("registerUser")]
    public async Task<IActionResult> AddUser(UserDto user){

        try {
            await _serviceManager.UserService.CreateAsync(user);
        }
        catch {
            return BadRequest();
        }

        return Ok();
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("loginUser")]
    public async Task<IActionResult> LoginUser(LoginUserDto loginUser) {

        TokenDto user = await _serviceManager.UserService.LoginUserAsync(loginUser);

        if (user.errorMessage == "") {

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
            user.token = tokenHandler.WriteToken(securityToken);

            return Ok(user);
        }
        else {
            return BadRequest(user.errorMessage);
        }
    }

    [HttpGet]
    [Authorize(Roles = "admin,consumer")]
    [Route("getuser/{id?}")]
    public async Task<IActionResult> GetUserByID(long id) {

        UserDto user = await _serviceManager.UserService.GetByIdAsync(id);

        return Ok(user);
    }

    [HttpDelete]
    [Authorize(Roles = "admin")]
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

    [HttpGet]
    [AllowAnonymous]
    [Route("verify/{email}/{token}")]
    public async Task<IActionResult> VerifyUser(string email, string token) {
        
        bool verified = await _serviceManager.UserService.VerifyUser(email, token);

        if (verified) {
            return Ok("Verification successfull.");
        }
        else {
            return BadRequest("Verification Unsuccesfull.");
        }
    }

    [HttpPut]
    [AllowAnonymous]
    [Route("passwordReset/{email}/{token}/{password}")]
    public async Task<IActionResult> ResetPassword(string email, string token, string password) {
        
        bool reset = await _serviceManager.UserService.ResetPassword(email, token, password);

        if(reset){
            return Ok("Password changed successfully.");
        }else{
            return BadRequest("User doesn't exist or the token is broken. Send for another password reset request.");
        }
        
    }

    [HttpPut]
    [AllowAnonymous]
    [Route("requestReset/{email}")]
    public async Task<IActionResult> RequestPass(string email){

        bool request = await _serviceManager.UserService.RequestPassReset(email, "Oops. Forgot your password? Heres a link to change it.");

        if(request){
            return Ok("Password request sent successfully.");
        }else{
            return BadRequest("User doesn't exist.");
        }

    }

    [HttpPut]
    [Authorize(Roles = "admin")]
    [Route("adminReset/{email}")]
    public async Task<IActionResult> AdminResetPassword(string email){

        bool request = await _serviceManager.UserService.RequestPassReset(email, "The administration has reset your password. Heres a link to set your new password.");

        if(request){
            return Ok("Password request sent successfully.");
        }else{
            return BadRequest("User doesn't exist.");
        }

    }

    [HttpPut]
    [Authorize(Roles = "admin")]
    [Route("block/{id}")]
    public async Task<IActionResult> BlockUser(long id) {

        bool success = await _serviceManager.UserService.BlockUser(id);
        if (success) {
            return Ok("Operation successfull.");
        }
        else {
            return NotFound("User not found, so could not be blocked.");
        }
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("getPaginated/")]
    public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

        var results = await _serviceManager.UserService.GetPaginated(page, itemCount, letters, searchTerm);

        return Ok(results);
    }

}
