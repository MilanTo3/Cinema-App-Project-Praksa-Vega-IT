namespace ServicesAbstraction;

public interface IServiceManager
{

    IUserService UserService {get;}
    IGenreService GenreService {get;}

}
