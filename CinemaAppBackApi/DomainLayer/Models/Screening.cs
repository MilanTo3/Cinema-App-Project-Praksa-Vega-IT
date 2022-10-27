namespace DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class Screening
{
    [Key]
    public long screeningId{get;set;} 
    public long movieId {get;set;}
    public DateTime fromScreening {get;set;}
    public int row {get;set;}
    public int column {get;set;}
    public float price {get;set;}
    public bool deleted{get;set;}
    public Movie Movie{get;set;}
    public DateTime updateDateTime { get; set; }
}
