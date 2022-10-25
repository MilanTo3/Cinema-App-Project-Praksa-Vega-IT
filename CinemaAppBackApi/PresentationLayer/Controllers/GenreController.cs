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
    public async Task<IActionResult> AddGenre(GenreDto dto){

        bool added = await _serviceManager.GenreService.CreateAsync(dto);

        if(added){
            return Ok();
        }else{
            return BadRequest("Genre not created. Maybe that genre already exists?");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteGenre(long id){

        bool deleted = await _serviceManager.GenreService.DeleteAsync(id);
        if(deleted){
            return Ok("Genre deleted successfully.");
        }else{
            return BadRequest("Delete not operated. Genre does not exist.");
        }
    }

    [HttpPut]
    [Route("{id}/{name}")]
    public async Task<IActionResult> UpdateGenre(long id, string name){

        bool updated = await _serviceManager.GenreService.UpdateAsync(id, name);
        if(updated){
            return Ok();
        }else{
            return BadRequest("Updated not operated. New genre name already exists?");
        }

    }

}
