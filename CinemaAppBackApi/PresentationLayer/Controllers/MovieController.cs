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
        public async Task<IActionResult> AddMovie([FromForm] string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] List<string> genres, [FromForm] IFormFile imageFile) {

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

        [HttpGet]
        [Route("getImage/{id}")]
        public async Task<IActionResult> GetImage(long id)
        {

            string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
            DirectoryInfo d = new DirectoryInfo(pathToRead);
            FileInfo[] Files = d.GetFiles();
            FileInfo file = Files.ToList().FirstOrDefault(x => x.Name.Split('.')[0] == ("movie" + id.ToString()));
            
            if(file == null){
                return NotFound("Poster image not found!");
            }

            string mimeType = "image/" + file.Extension.Remove(0, 1).ToLower();

            var bytes = await System.IO.File.ReadAllBytesAsync(file.FullName);
            return File(bytes, mimeType, Path.GetFileName(file.Name));
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

        [HttpPut]
        public async Task<IActionResult> UpdateMovie([FromForm] long movieId, [FromForm] string nameLocal, [FromForm] string nameOriginal, [FromForm] string trailer, [FromForm] int duration, [FromForm] List<string> genres, [FromForm] IFormFile? imageFile){

            MovieDto dto = new MovieDto();
            dto.movieId = movieId;
            dto.nameLocal = nameLocal;
            dto.nameOriginal = nameOriginal;
            dto.trailer = trailer;
            dto.duration = duration;
            dto.genres = genres;
            dto.imageFile = imageFile;

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
        [Route("getPaginated/")]
        public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

            var results = await _serviceManager.MovieService.GetPaginated(page, itemCount, letters, searchTerm);

            return Ok(results);
        }

    }
}
