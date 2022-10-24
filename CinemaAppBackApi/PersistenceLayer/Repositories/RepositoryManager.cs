namespace PersistenceLayer.Repositories;
using DomainLayer.Repositories;

public class RepositoryManager : IRepositoryManager
{

    private readonly Lazy<IUserRepository> _lazyUserRepository;
    private readonly Lazy<IGenreRepository> _lazyGenreRepository;
    private readonly Lazy<IUnitofWork> _lazyUnitOfWork;

    public RepositoryManager(RepositoryDbContext dbContext){

        _lazyUserRepository = new Lazy<IUserRepository>(() => new UserRepository(dbContext));
        _lazyGenreRepository = new Lazy<IGenreRepository>(() => new GenreRepository(dbContext));
        _lazyUnitOfWork = new Lazy<IUnitofWork>(() => new UnitOfWork(dbContext));

    }

    public IUserRepository userRepository => _lazyUserRepository.Value;

    public IGenreRepository genreRepository => _lazyGenreRepository.Value;
    public IUnitofWork UnitOfWork => _lazyUnitOfWork.Value;

}
