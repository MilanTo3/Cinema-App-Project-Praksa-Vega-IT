namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;

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



}
