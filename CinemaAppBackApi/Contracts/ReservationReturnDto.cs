namespace Contracts;

public class ReservationReturnDto
{

    public ReservationReturnDto(long id, string email, string title, DateTime start, string[] seats, long totalprice, long movid){

        reservationId = id;
        this.email = email;
        this.title = title;
        this.start = start;
        this.seats = seats;
        this.totalprice = totalprice;
        movieId = movid;

    }

    public long reservationId{get;set;}
    public string email{get;set;}
    public string title{get;set;}
    public DateTime start{get;set;}
    public string[] seats{get;set;}
    public long totalprice{get;set;}
    public long movieId{get;set;}
}
