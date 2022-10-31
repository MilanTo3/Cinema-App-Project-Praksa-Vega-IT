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

namespace PresentationLayer.Controllers;

[ApiController]
[Route("api/reservations")]
public class ReservationController : ControllerBase
{

    private readonly IServiceManager _serviceManager;
    public ReservationController(IServiceManager serviceManager) {
        _serviceManager = serviceManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        var reservations = await _serviceManager.ReservationService.GetAllAsync();

        return Ok(reservations);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetReservation(long id) {

        ReservationDto reservation = await _serviceManager.ReservationService.GetByIdAsync(id);

        return Ok(reservation);
    }

    [HttpPost]
    public async Task<IActionResult> AddReservation([FromForm]ReservationDto dto){

        bool added = await _serviceManager.ReservationService.CreateAsync(dto);

        if(added){
            return Ok("Reservation added. Check your mail!");
        }else{
            return BadRequest("Reservation not created.");
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteReservation(long id){

        bool deleted = await _serviceManager.ReservationService.DeleteAsync(id);
        if(deleted){
            return Ok("Reservation deleted successfully.");
        }else{
            return BadRequest("Delete not operated. Reservation does not exist.");
        }
    }

    [HttpGet]
    [Route("getReserved/{id}")]
    public async Task<IActionResult> getReservedSeats(long id){

        var seats = await _serviceManager.ReservationService.GetReservedSeats(id);

        return Ok(seats);
    }

    [HttpGet]
    [Route("getReservations/{direction}/{email}")]
    public async Task<IActionResult> getReservedSeats(int direction, string email){

        var seats = await _serviceManager.ReservationService.GetAllRelP(direction, email);

        return Ok(seats);
    }

}
