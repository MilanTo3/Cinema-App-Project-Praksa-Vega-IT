using System.Threading;
using System.Threading.Tasks;
using DomainLayer.Repositories;
namespace PersistenceLayer.Repositories;

public class UnitOfWork : IUnitofWork
{

    private readonly RepositoryDbContext _dbContext;

        public UnitOfWork(RepositoryDbContext dbContext) => _dbContext = dbContext;

        public Task<int> Complete() =>
            _dbContext.SaveChangesAsync();

}
