using RepoLayer;
using ServiceLayer.Contract_Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Implementation
{
    public class UnitofWork: IUnitofWork
    {

        private IUserRepository _users;
        public IUserRepository users { get; private set; }
        private AppDbContext dbContext;

        public UnitofWork(AppDbContext dbContext)
        {

            this.dbContext = dbContext;
            users = new UserRepository(this.dbContext);

        }

        public int Complete()
        {
            return dbContext.SaveChanges();
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }

    }
}
