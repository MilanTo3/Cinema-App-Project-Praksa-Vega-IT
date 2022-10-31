namespace DomainLayer.Models;
using System.ComponentModel.DataAnnotations;

public class Reservation
{

    public Reservation(){
        reservedSeats = new List<ReservedSeat>();
    }

    [Key]
    public long reservationId { get;set; }
    public long screeningId{get;set;}
    public string email { get;set; }
    public long totalPrice {get;set;}
    public ICollection<ReservedSeat> reservedSeats{get;set;}
    public Screening screening{get;set;}
    public bool deleted { get;set; }

}