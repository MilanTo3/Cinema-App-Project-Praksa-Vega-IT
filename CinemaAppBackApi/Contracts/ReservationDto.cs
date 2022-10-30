namespace Contracts;

public class ReservationDto
{
    public string email{get;set;}
    public long screeningId{get;set;}
    public string[] seats{get;set;}
    public long totalPrice {get;set;}
}
