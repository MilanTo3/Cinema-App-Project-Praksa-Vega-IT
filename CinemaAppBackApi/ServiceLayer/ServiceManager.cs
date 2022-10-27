namespace ServiceLayer;
using ServicesAbstraction;
using DomainLayer.Repositories;

public class ServiceManager: IServiceManager
{

    private readonly Lazy<IUserService> _lazyUserService;
    private readonly Lazy<IGenreService> _lazyGenreService;
    private readonly Lazy<IMovieService> _lazyMovieService;
    private readonly Lazy<IScreeningService> _lazyScreeningService;

    public ServiceManager(IRepositoryManager repositoryManager){
        _lazyUserService = new Lazy<IUserService>(() => new UserService(repositoryManager));
        _lazyGenreService = new Lazy<IGenreService>(() => new GenreService(repositoryManager));
        _lazyMovieService = new Lazy<IMovieService>(() => new MovieService(repositoryManager));
        _lazyScreeningService = new Lazy<IScreeningService>(() => new ScreeningService(repositoryManager));

    }

    public IUserService UserService => _lazyUserService.Value;
    public IGenreService GenreService => _lazyGenreService.Value;
    public IMovieService MovieService => _lazyMovieService.Value;
    public IScreeningService ScreeningService => _lazyScreeningService.Value;

}
