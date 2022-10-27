namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;

public class ScreeningRepository: GenericRepository<Screening>, IScreeningRepository
{
    public ScreeningRepository(RepositoryDbContext _context): base(_context) {
    }

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.screeningId == id).FirstOrDefaultAsync();
            if (exist != null) {
                exist.deleted = true;
            }

        }catch(Exception ex) {
            return false;
        }
        return true;
    }

    public override async Task<bool> Update(Screening screening) {

        try {
            var exist = await dbSet.Where(x => x.screeningId == screening.screeningId).FirstOrDefaultAsync();
            if (exist != null) {
                exist.fromScreening = screening.fromScreening;
                exist.row = screening.row;
                exist.column = screening.column;
                exist.price = screening.price;
                exist.deleted = screening.deleted;
                exist.updateDateTime = DateTime.Now;
            }
        }
        catch (Exception ex) {
            return false;
        }

        return true;
    }

    public async Task<IEnumerable<Screening>> GetAllInclusive(){
        var movies = await dbSet.Include(x => x.Movie).ToListAsync();

        return movies;
    }

    public async Task<Screening> GetByIdInclusive(long screeningId){

        var movies = await dbSet.Include(x => x.Movie).ToListAsync();

        return movies.Find(x => x.screeningId == screeningId);
    }

}
