using System;
using System.Threading;
using System.Threading.Tasks;
using Contracts;
using System.IO;
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
        public async Task<IActionResult> AddMovie([FromForm] string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] string genres, [FromForm] IFormFile imageFile) {

            MovieDto dto = new MovieDto();
            dto.nameLocal = nameLocal;
            dto.nameOriginal = nameOriginal;
            dto.trailer = trailer;
            dto.duration = duration;
            dto.genres = genres;
            dto.imageFile = imageFile;

            string pathToWrite = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
            if (!System.IO.Directory.Exists(pathToWrite))
                return BadRequest("Error in the image server.");

            bool added = await _serviceManager.MovieService.CreateAsync(dto, pathToWrite);
            if(added){
                return Ok($"Movie {nameOriginal} added successfully");
            }else{
                return BadRequest("Error adding a movie.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies(){

            var genres = await _serviceManager.MovieService.GetAllAsync();

            return Ok(genres);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMovie(long id) {

            MovieDto genre = await _serviceManager.MovieService.GetByIdAsync(id);

            return Ok(genre);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteMovie(long id){

            bool deleted = await _serviceManager.MovieService.DeleteAsync(id);
            if(deleted){
                return Ok("Movie deleted successfully.");
            }else{
                return BadRequest("Delete not operated. Movie does not exist.");
            }
        }

    }
}
