namespace DomainLayer.Models;

public class Movie
{

    public long movieId { get;set; }
    public string nameLocal { get;set; }
    public string nameOriginal { get; set; }
    public string trailer { get;set; }
    public int duration { get;set; }
    public bool deleted { get;set; }

}
