namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using Contracts;

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

    public async Task<DtoPaginated<Screening>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var movies = dbSet.Include(x => x.Movie).Where(x => x.deleted == false);

        if(searchTerm != null){
            movies = movies.Where(x => x.Movie.nameLocal.ToLower().Contains(searchTerm.ToLower()));
        }

        if(letters != null && letters.Count() != 0){
            //movies = movies.Where(x => letters.Contains(x.Movie.nameLocal[0])); Eh, why is this not working??
            //k = k.Where(x => letters.Contains(x.Movie.nameLocal.ToUpper()[0])).ToList();
            movies = movies.Where(x => letters.Contains(x.Movie.nameLocal.ToUpper().Substring(0, 1)));
        }

        var pageCount = Math.Ceiling((double)(movies.Count() / itemCount));
        var paginatedDtos = await movies.Skip((page * (int)itemCount)).Take((int)itemCount).ToListAsync();

        DtoPaginated<Screening> paginated = new DtoPaginated<Screening>(){ Data = paginatedDtos, ActualCount = movies.Count() };

        return paginated;
    }

}
