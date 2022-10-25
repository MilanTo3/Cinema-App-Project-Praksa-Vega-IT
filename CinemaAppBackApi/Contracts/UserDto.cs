namespace Contracts;

public class UserDto
{

    public long userId{get;set;}
    public string name{get;set;}
    public DateTime birthday{get;set;}
    public string email{get;set;}
    public string password{get;set;}

    public bool? verified { get; set; }
    public bool? blocked { get; set; }

}
