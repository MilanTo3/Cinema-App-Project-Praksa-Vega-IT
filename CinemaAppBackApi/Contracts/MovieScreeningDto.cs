namespace Contracts;
using Microsoft.AspNetCore.Http;
public class MovieScreeningDto
{

    public MovieScreeningDto(){
        genres = new List<string>();
        movieScreenings = new List<ScreeningDto2>();
    }

    public long movieId { get;set; }
    public string nameLocal { get;set; }
    public string nameOriginal { get; set; }
    public int duration { get;set; }
    public List<string> genres { get;set; }
    public List<ScreeningDto2> movieScreenings { get;set; }

}

public class ScreeningDto2{
    public long screeningId{ get;set; }
    public DateTime fromScreening{ get;set;}
}