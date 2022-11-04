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
[Route("api/genres")]
public class GenreController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public GenreController(IServiceManager serviceManager){
        _serviceManager = serviceManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {
        var genres = await _serviceManager.GenreService.GetAllAsync();

        return Ok(genres);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetGenre(long id) {

        GenreDto genre = await _serviceManager.GenreService.GetByIdAsync(id);

        return Ok(genre);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> AddGenre(GenreDto dto){

        await _serviceManager.GenreService.CreateAsync(dto);

        return Ok();
    }

    [HttpDelete]
    [Authorize(Roles = "admin")]
    [Route("{id}")]
    public async Task<IActionResult> DeleteGenre(long id){

        await _serviceManager.GenreService.DeleteAsync(id);
        return Ok("Genre deleted successfully.");
    }

    [HttpPut]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> UpdateGenre(GenreDto dto){

        await _serviceManager.GenreService.UpdateAsync(dto.genreId, dto.name);
        return Ok();
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    [Route("getPaginated/")]
    public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

        var results = await _serviceManager.GenreService.GetPaginated(page, itemCount, letters, searchTerm);

        return Ok(results);
    }

}
