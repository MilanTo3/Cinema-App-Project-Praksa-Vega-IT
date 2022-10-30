namespace DomainLayer.Models;
using System.ComponentModel.DataAnnotations;

public class ReservedSeat
{
    [Key]
    public long seatId{get;set;}
    public long screeningId{get;set;}
    public long reservationId{get;set;}
    public string rowColumnId{get;set;}
    public Reservation reservation{get;set;}
    public string email{get;set;}

}
