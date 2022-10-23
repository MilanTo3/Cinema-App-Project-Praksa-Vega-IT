using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Repositories
{
    public interface IUserRepository: IGenericRepository<User>
    {

        Task<User> LoginUserAsync(string email, string password);
        Task<User> GetByEmail(string email);

    }
}
