namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using System.Security.Cryptography;

public class UserRepository: GenericRepository<User>, IUserRepository
{

    public UserRepository(RepositoryDbContext _context): base(_context) {
    }

    public async Task<User> LoginUserAsync(string email, string password) {

        var users = await dbSet.ToListAsync();
        User user = users.Find(x => x.email == email);

        if (user == null) {
            return null;
        }

        return user;
    }

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.userId == id).FirstOrDefaultAsync();
            if (exist != null) {
                dbSet.Remove(exist);
            }

        }catch(Exception ex) {
            return false;
        }
        return true;
    }

    public override async Task<bool> Update(User user) {

        try {
            var exist = await dbSet.Where(x => x.userId == user.userId).FirstOrDefaultAsync();
            if (exist != null) {
                exist.blocked = user.blocked;
                exist.verified = user.verified;
                exist.password = user.password;
                exist.PasswordResetToken = user.PasswordResetToken;
                exist.updateDateTime = DateTime.Now;
            }
        }
        catch (Exception ex) {
            return false;
        }
        return true;
    }

    public async Task<User> GetByEmail(string email) {

        return await dbSet.Where(x => x.email == email).FirstOrDefaultAsync();
    }
}
