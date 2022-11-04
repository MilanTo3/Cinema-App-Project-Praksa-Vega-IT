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
    public async Task<IActionResult> GetAccounts()
    {
        var usersDto = await _serviceManager.UserService.GetAllAsync();

        return Ok(usersDto);
    }

    [HttpGet]
    [Authorize(Roles = "admin,consumer")]
    [Route("{id?}")]
    public async Task<IActionResult> GetUserByID(long id) {

        UserDto user = await _serviceManager.UserService.GetByIdAsync(id);

        return Ok(user);
    }

    [HttpDelete]
    [Authorize(Roles = "admin")]
    [Route("{id?}")]
    public async Task<IActionResult> DeleteUser(long id) {

        bool deleted = await _serviceManager.UserService.DeleteAsync(id);
        return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("verify")]
    public async Task<IActionResult> VerifyUser([FromQuery]string email, [FromQuery]string token) {
        
        bool verified = await _serviceManager.UserService.VerifyUser(email, token);

        return Ok("Verification successfull.");
    }

    [HttpPut]
    [AllowAnonymous]
    [Route("passwordReset")]
    public async Task<IActionResult> ResetPassword([FromQuery]string email, [FromQuery]string token, [FromQuery]string password) {
        
        bool reset = await _serviceManager.UserService.ResetPassword(email, token, password);

        return Ok("Password changed successfully.");  
    }

    [HttpPut]
    [AllowAnonymous]
    [Route("{email}")]
    public async Task<IActionResult> RequestPass(string email){

        bool request = await _serviceManager.UserService.RequestPassReset(email, "Oops. Forgot your password? Heres a link to change it.");

        return Ok("Password request sent successfully.");
    }

    [HttpPut]
    [Authorize(Roles = "admin")]
    [Route("adminReset/{email}")]
    public async Task<IActionResult> AdminResetPassword(string email){

        bool request = await _serviceManager.UserService.RequestPassReset(email, "The administration has reset your password. Heres a link to set your new password.");

        return Ok("Password request sent successfully.");
    }

    [HttpPut]
    [Authorize(Roles = "admin")]
    [Route("block/{id}")]
    public async Task<IActionResult> BlockUser(long id) {

        bool success = await _serviceManager.UserService.BlockUser(id);
        return Ok("Operation successfull.");  
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("getPaginated/")]
    public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

        var results = await _serviceManager.UserService.GetPaginated(page, itemCount, letters, searchTerm);

        return Ok(results);
    }

}
