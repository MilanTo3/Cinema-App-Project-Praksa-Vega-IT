using DomainLayer.Models;
using RepoLayer;
using ServiceLayer.Contract_Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Implementation
{
    public class UserRepository : Repository<User>, IUserRepository
    {

        public UserRepository(AppDbContext dbContext): base(dbContext)
        {

        }

        public void approveUser(long id)
        {
            User user = dbContext.users.Find(id);
            if (user != null)
            {
                user.verified = true;
            }

        }

        public void blockUser(long id)
        {
            User user = dbContext.users.Find(id);
            if (user != null)
            {
                user.blocked = true;
            }
        }

    }
}
