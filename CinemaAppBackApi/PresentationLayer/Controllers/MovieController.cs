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
using Microsoft.AspNetCore.Http;

namespace PresentationLayer.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {

        private readonly IServiceManager _serviceManager;
        public MovieController(IServiceManager serviceManager) {
            _serviceManager = serviceManager;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> AddMovie([FromForm]string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] IFormFile imageFile) {

          
            return Ok();
        }

    }
}
