namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using Contracts;

public class MovieRepository: GenericRepository<Movie>, IMovieRepository{
    
    RepositoryDbContext cont;
    public MovieRepository(RepositoryDbContext _context): base(_context) {
        cont = _context;
    }
    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.movieId == id).FirstOrDefaultAsync();
            if (exist != null) {
                exist.deleted = true;
            }
            
        }catch(Exception ex) {
            return false;
        }
        return true;
    }

    public async Task<bool> AddId(Movie movie){

        try {
            await dbSet.AddAsync(movie);
        }
        catch {
            return false;
        }

        return true;
    }

    public override async Task<Movie> getById(long id){

        var movies = await dbSet.Include(x => x.Genres).ToListAsync();

        return movies.Find(x => x.movieId == id);
    }

    public async Task<Movie> getByIdInclusive(long id){
        var movies = await dbSet.Include(x => x.Screenings).Where(x => x.deleted == false).ToListAsync();

        return movies.Find(x => x.movieId == id);
    }

    public async Task<bool> UpdateMovie(MovieDto dto, List<Genre> newGen){

        var movies = await dbSet.Include(x => x.Genres).ToListAsync();
        var movie = movies.Find(x => x.movieId == dto.movieId);
        movie.nameLocal = dto.nameLocal;
        movie.nameOriginal = dto.nameOriginal;
        movie.duration = dto.duration;
        movie.trailer = dto.trailer;
        movie.Genres = newGen;

        try{
            dbSet.Update(movie);
        }catch{
            return false;
        }

        return true;
    }

    public async Task<IEnumerable<Movie>> GetMoviesWithScreenings(DateTime? day, List<Genre>? genres, bool? sort){

        var movies = dbSet.Include(x => x.Genres).Include(x => x.Screenings.Where(x => x.deleted == false)).Where(x => x.Screenings.Count != 0 && x.deleted == false).OrderBy(x => x.Screenings.Min(x => x.fromScreening)).AsSplitQuery();
        if(day != null){
            movies = movies.Where(x => x.Screenings.Any(x => x.fromScreening.Date == ((DateTime)day).Date));
        }
        if(genres != null){
            movies = movies.Where(x => x.Genres.Any(item => genres.Contains(item)));
            // movies = movies.Where(x => genres.All(j => x.Genres.Contains(j)));   ?
        }
        if(sort == true){
            movies = movies.OrderBy(x => x.nameLocal);
        }

        return await movies.ToListAsync();
    }

    public async Task<DtoPaginated<Movie>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var movies = dbSet.Where(x => x.deleted == false);

        if(searchTerm != null){
            movies = movies.Where(x => x.nameLocal.ToLower().Contains(searchTerm.ToLower()));
        }

        if(letters != null && letters.Count() != 0){
            movies = movies.Where(x => letters.Contains(x.nameLocal.ToUpper().Substring(0, 1)));
        }

        var pageCount = Math.Ceiling((double)(movies.Count() / itemCount));
        var paginatedDtos = await movies.Skip((page * (int)itemCount)).Take((int)itemCount).ToListAsync();

        DtoPaginated<Movie> paginatedp = new DtoPaginated<Movie>(){ Data = paginatedDtos, ActualCount = movies.Count() };

        return paginatedp;
    }

    public override async Task<bool> Update(Movie movie){

        try {
            var exist = await dbSet.Where(x => x.movieId == movie.movieId).FirstOrDefaultAsync();
            if (exist != null) {
                exist.nameLocal = movie.nameLocal;
                exist.nameOriginal = movie.nameOriginal;
                exist.duration = movie.duration;
                exist.trailer = movie.trailer;
                exist.averageRating = movie.averageRating;
                exist.deleted = movie.deleted;
            }
        }
        catch (Exception ex) {
            return false;
        }

        return true;
    }

}
