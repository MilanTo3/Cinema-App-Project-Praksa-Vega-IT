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
    [Route("{name?}")]
    public async Task<IActionResult> GetGenre(string name) {

        GenreDto genre = await _serviceManager.GenreService.GetByNameAsync(name);

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
    [Route("{name}")]
    public async Task<IActionResult> DeleteGenre(string name){

        bool deleted = await _serviceManager.GenreService.DeleteAsync(name);
        if(added){
            return Ok();
        }else{
            return BadRequest("Delete not operated. Genre does not exist.");
        }
    }

    [HttpPut]
    [Route("{name}/{newname}")]
    public async Task<IActionResult> UpdateGenre(string name, string newname){

        bool updated = await _serviceManager.GenreService.UpdateAsync(name, newname);
        if(added){
            return Ok();
        }else{
            return BadRequest("Updated not operated. New genre name already exists?");
        }

    }

}
