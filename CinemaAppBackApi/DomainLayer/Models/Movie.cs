namespace DomainLayer.Models;

public class Movie
{

    public Movie(){
        this.Genres = new List<Genre>();
    }

    public long movieId { get;set; }
    public string nameLocal { get;set; }
    public string nameOriginal { get; set; }
    public string trailer { get;set; }
    public int duration { get;set; }
    public virtual ICollection<Genre> Genres { get;set; }
    public bool deleted { get;set; }

}
