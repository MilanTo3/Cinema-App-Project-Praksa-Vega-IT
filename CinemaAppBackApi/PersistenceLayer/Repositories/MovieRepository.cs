namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;

public class MovieRepository: GenericRepository<Movie>, IMovieRepository{
    
    public MovieRepository(RepositoryDbContext _context): base(_context) {
    }

}
