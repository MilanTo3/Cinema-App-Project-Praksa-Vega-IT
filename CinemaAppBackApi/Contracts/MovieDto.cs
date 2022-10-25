namespace Contracts;
using Microsoft.AspNetCore.Http;
public class MovieDto
{

    public string movieId { get;set; }
    public string nameLocal { get;set; }
    public string nameOriginal { get; set; }
    public string trailer { get;set; }
    public int duration { get;set; }
    public IFormFile imageFile { get; set; }

}
