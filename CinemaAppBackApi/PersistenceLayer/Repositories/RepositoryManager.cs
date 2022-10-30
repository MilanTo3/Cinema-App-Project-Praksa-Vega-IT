namespace PersistenceLayer.Repositories;
using DomainLayer.Repositories;

public class RepositoryManager : IRepositoryManager
{

    private readonly Lazy<IUserRepository> _lazyUserRepository;
    private readonly Lazy<IGenreRepository> _lazyGenreRepository;
    private readonly Lazy<IUnitofWork> _lazyUnitOfWork;
    private readonly Lazy<IMovieRepository> _lazyMovieRepository;
    private readonly Lazy<IScreeningRepository> _lazyScreeningRepository;
    private readonly Lazy<IReservationRepository> _lazyReservationRepository;

    public RepositoryManager(RepositoryDbContext dbContext){

        _lazyUserRepository = new Lazy<IUserRepository>(() => new UserRepository(dbContext));
        _lazyGenreRepository = new Lazy<IGenreRepository>(() => new GenreRepository(dbContext));
        _lazyUnitOfWork = new Lazy<IUnitofWork>(() => new UnitOfWork(dbContext));
        _lazyMovieRepository = new Lazy<IMovieRepository>(() => new MovieRepository(dbContext));
        _lazyScreeningRepository = new Lazy<IScreeningRepository>(() => new ScreeningRepository(dbContext));
        _lazyReservationRepository = new Lazy<IReservationRepository>(() => new ReservationRepository(dbContext));

    }

    public IUserRepository userRepository => _lazyUserRepository.Value;

    public IGenreRepository genreRepository => _lazyGenreRepository.Value;
    public IUnitofWork UnitOfWork => _lazyUnitOfWork.Value;
    public IMovieRepository movieRepository => _lazyMovieRepository.Value;
    public IScreeningRepository screeningRepository => _lazyScreeningRepository.Value;
    public IReservationRepository reservationRepository => _lazyReservationRepository.Value;

}
