namespace ServiceLayer;
using ServicesAbstraction;
using DomainLayer.Repositories;

public class ServiceManager: IServiceManager
{

    private readonly Lazy<IUserService> _lazyUserService;
    private readonly Lazy<IGenreService> _lazyGenreService;

    public ServiceManager(IRepositoryManager repositoryManager){
        _lazyUserService = new Lazy<IUserService>(() => new UserService(repositoryManager));
        _lazyGenreService = new Lazy<IGenreService>(() => new GenreService(repositoryManager));
    }

    public IUserService UserService => _lazyUserService.Value;
    public IGenreService GenreService => _lazyGenreService.Value;

}
