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
    [Authorize(Roles = "admin,consumer")]
    public async Task<IActionResult> GetReservations()
    {
        var reservations = await _serviceManager.ReservationService.GetAllAsync();

        return Ok(reservations);
    }

    [HttpGet]
    [Authorize(Roles = "admin,consumer")]
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
    [Authorize(Roles = "admin,consumer")]
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
    [Route("{id}/getReserved")]
    public async Task<IActionResult> getReservedSeats(long id){

        var seats = await _serviceManager.ReservationService.GetReservedSeats(id);

        return Ok(seats);
    }

    [HttpGet]
    [Authorize(Roles = "admin,consumer")]
    [Route("getReservations/")]
    public async Task<IActionResult> getReservedSeats([FromQuery]int state, [FromQuery]string email){

        var seats = await _serviceManager.ReservationService.GetAllRelP(state, email);

        return Ok(seats);
    }

    [HttpPut]
    [Authorize(Roles = "admin,consumer")]
    [Route("rateReservation/")]
    public async Task<IActionResult> rateReservation([FromForm]long id, [FromForm]long movieid, [FromForm]int rating){

        bool rated = await _serviceManager.ReservationService.RateReservation(id, movieid, rating);

        if(rated){
            return Ok("Reservation rated successfully.");
        }else{
            return BadRequest("Error requesting a reservation rate.");
        }

    }

}
