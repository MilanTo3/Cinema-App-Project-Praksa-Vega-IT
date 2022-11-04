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

namespace PresentationLayer.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public AuthController(IServiceManager serviceManager) {
        _serviceManager = serviceManager;
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("registerUser")]
    public async Task<IActionResult> AddUser(UserDto user){
    
        await _serviceManager.UserService.CreateAsync(user);

        return Ok();
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("loginUser")]
    public async Task<IActionResult> LoginUser(LoginUserDto loginUser) {

        TokenDto user = await _serviceManager.UserService.LoginUserAsync(loginUser);

        return Ok(user);
    }

}
