namespace ServicesAbstraction;

public interface IServiceManager
{

    IUserService UserService {get;}
    IGenreService GenreService {get;}
    IMovieService MovieService {get;}
    IScreeningService ScreeningService {get;}
    IReservationService ReservationService{get;}

}
