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
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddMovie([FromForm] string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] List<string> genres, [FromForm] IFormFile imageFile) {

            MovieDto dto = new MovieDto(0, nameLocal, nameOriginal, trailer, duration, genres, imageFile);

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

        [HttpGet]
        [Route("{id}/image")]
        public async Task<IActionResult> GetImage(long id)
        {

            FileInfo file = _serviceManager.MovieService.GetImageFile(id);
            
            if(file == null){
                return NotFound("Poster image not found!");
            }

            string mimeType = "image/" + file.Extension.Remove(0, 1).ToLower();
            var bytes = await System.IO.File.ReadAllBytesAsync(file.FullName);
            return File(bytes, mimeType, Path.GetFileName(file.Name));
        }

        [HttpDelete]
        [Authorize(Roles = "admin")]
        [Route("{id}")]
        public async Task<IActionResult> DeleteMovie(long id){

            bool deleted = await _serviceManager.MovieService.DeleteAsync(id);
            return Ok("Movie deleted successfully.");
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateMovie([FromForm] long movieId, [FromForm] string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] List<string> genres, [FromForm] IFormFile? imageFile){

            MovieDto dto = new MovieDto(movieId, nameLocal, nameOriginal, trailer, duration, genres, imageFile);

            bool updated = await _serviceManager.MovieService.UpdateAsync(dto);
            if(updated){
                return Ok("Movie updated successfully.");
            }else{
                return BadRequest("Update not operated. Movie does not exist.");
            }

        }

        [HttpGet]
        [Route("getWithScreens/")]
        public async Task<IActionResult> GetWithScreens(){

            var movies = await _serviceManager.MovieService.GetMoviesWithScreenings(null, null, false);
            
            return Ok(movies);
        }

        [HttpGet]
        [Route("getWithScreensFilter/")]
        public async Task<IActionResult> GetWithScreensFilter([FromQuery]bool sort = false, [FromQuery]DateTime? day = null, [FromQuery(Name = "genres[]")]List<string>? genres = null){

            var movies = await _serviceManager.MovieService.GetMoviesWithScreenings(day, genres, sort);
            
            return Ok(movies);
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        [Route("getPaginated/")]
        public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

            var results = await _serviceManager.MovieService.GetPaginated(page, itemCount, letters, searchTerm);

            return Ok(results);
        }

    }
}
