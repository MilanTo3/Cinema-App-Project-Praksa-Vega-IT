namespace Contracts;

public class ReservationReturnDto
{
    public string email{get;set;}
    public string title{get;set;}
    public DateTime start{get;set;}
    public string[] seats{get;set;}
    public long totalprice{get;set;}
    public long movieId{get;set;}
}
