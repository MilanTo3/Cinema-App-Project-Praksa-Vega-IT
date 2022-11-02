namespace PresentationLayer.Controllers;
using System;
using System.Threading;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Mvc;
using ServicesAbstraction;

[ApiController]
[Route("api/screenings")]
public class ScreeningController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public ScreeningController(IServiceManager serviceManager){
        _serviceManager = serviceManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetScreenings()
    {
        var screenings = await _serviceManager.ScreeningService.GetAllAsync();

        return Ok(screenings);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetScreening(long id) {

        ScreeningDto screening = await _serviceManager.ScreeningService.GetByIdAsync(id);

        return Ok(screening);
    }

    [HttpPost]
    public async Task<IActionResult> AddGenre(ScreeningDto dto){

        bool added = await _serviceManager.ScreeningService.CreateAsync(dto);

        if(added){
            return Ok($"Screening for {dto.name} added successfully!");
        }else{
            return BadRequest("Screening not created. Maybe that screening already exists?");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteScreening(long id){

        bool deleted = await _serviceManager.ScreeningService.DeleteAsync(id);
        if(deleted){
            return Ok("Screening deleted successfully.");
        }else{
            return BadRequest("Delete not operated. Screening does not exist.");
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateGenre(ScreeningDto dto){

        bool updated = await _serviceManager.ScreeningService.UpdateAsync(dto);
        if(updated){
            return Ok("Screening updated successfully!");
        }else{
            return BadRequest("Updated not operated. Invalid screening.");
        }

    }

    [HttpGet]
    [Route("getPaginated/")]
    public async Task<IActionResult> getPaginated([FromQuery]int page = 0, [FromQuery]int itemCount = 5, [FromQuery(Name = "letters[]")] string[]? letters = null, [FromQuery] string? searchTerm = null){

        var results = await _serviceManager.ScreeningService.GetPaginated(page, itemCount, letters, searchTerm);

        return Ok(results);
    }

}