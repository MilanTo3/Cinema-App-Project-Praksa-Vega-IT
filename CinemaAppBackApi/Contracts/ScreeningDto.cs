namespace Contracts;

public class ScreeningDto
{
    public long movieId {get;set;}
    public DateTime fromScreening {get;set;}
    public int row {get;set;}
    public int column {get;set;}
    public float price {get;set;}
}
