namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;
using Contracts;

public class GenreRepository: GenericRepository<Genre>, IGenreRepository{

    public GenreRepository(RepositoryDbContext _context): base(_context) {
    }

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.genreId == id).FirstOrDefaultAsync();
            if (exist != null) {
                exist.deleted = true;
            }

        }catch(Exception ex) {
            return false;
        }
        return true;
    }

    public async Task<bool> UpdateName(Genre genre, string nameGenre) {

        var exist = await dbSet.Where(x => x.name == nameGenre).FirstOrDefaultAsync();
        if(exist != null){
            return false;
        }

        try {
            var updategenre = await dbSet.Where(x => x.genreId == genre.genreId).FirstOrDefaultAsync();

            updategenre.name = nameGenre;
            updategenre.updated = DateTime.Now;
            
        }
        catch (Exception ex) {
            return false;
        }
        return true;
    }

    public async Task<Genre> GetByName(string name) {

        return await dbSet.Where(x => x.name == name).FirstOrDefaultAsync();
    }

    public async Task<DtoPaginated<Genre>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var genres = dbSet.Where(x => x.deleted == false);

        if(searchTerm != null){
            genres = genres.Where(x => x.name.ToLower().Contains(searchTerm.ToLower()));
        }

        if(letters != null && letters.Count() != 0){
            genres = genres.Where(x => letters.Contains(x.name.ToUpper().Substring(0, 1)));
        }

        var pageCount = Math.Ceiling((double)(genres.Count() / itemCount));
        var paginated = await genres.Skip((page * (int)itemCount)).Take((int)itemCount).ToListAsync();

        DtoPaginated<Genre> paginatedp = new DtoPaginated<Genre>(){ Data = paginated, ActualCount = genres.Count() };

        return paginatedp;
    }

}