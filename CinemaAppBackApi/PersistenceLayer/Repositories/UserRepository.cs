namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;

public class UserRepository: IUserRepository
{

    private readonly RepositoryDbContext _dbContext;

    public UserRepository(RepositoryDbContext dbContext) => _dbContext = dbContext;
    public async Task<IEnumerable<User>> GetAllAsync(CancellationToken cancellationToken = default) =>
        await _dbContext.Users.ToListAsync(cancellationToken);
    public async Task<User> GetByIdAsync(long accountId, CancellationToken cancellationToken = default) =>
        await _dbContext.Users.FirstOrDefaultAsync(x => x.userId == accountId, cancellationToken);
    public void Insert(User user) => _dbContext.Users.Add(user);
    public void Remove(User user) => _dbContext.Users.Remove(user);

}
