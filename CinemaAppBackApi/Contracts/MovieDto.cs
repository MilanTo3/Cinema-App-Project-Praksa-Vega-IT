namespace Contracts;
using Microsoft.AspNetCore.Http;
public class MovieDto
{

    public MovieDto(){
        
    }

    public MovieDto(long id, string nameloc, string nameori, string tr, int dur, List<string> gen, IFormFile image){

        movieId = id;
        nameLocal = nameloc;
        nameOriginal = nameori;
        trailer = tr;
        duration = dur;
        genres = gen;
        imageFile = image;

    }

    public long movieId { get;set; }
    public string nameLocal { get;set; }
    public string nameOriginal { get; set; }
    public string trailer { get;set; }
    public int duration { get;set; }
    public List<string> genres { get;set; }
    public IFormFile imageFile { get; set; }

}
