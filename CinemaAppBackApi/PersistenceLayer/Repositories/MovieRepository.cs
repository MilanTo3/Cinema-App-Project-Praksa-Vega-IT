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

    public async Task<IEnumerable<Movie>> GetMoviesWithScreenings(){

        var movies = await dbSet.Include(x => x.Genres).Include(x => x.Screenings).Where(x => x.Screenings.Count != 0).OrderBy(x => x.Screenings.OrderBy(x => x.fromScreening).FirstOrDefault()).ToListAsync();

        return movies;
    }

}
