using RepoLayer;
using ServiceLayer.Contract_Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Implementation
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {

        protected readonly AppDbContext dbContext;

        public Repository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Add(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
        }

        public TEntity GetOneRecord(long id)
        {
            return dbContext.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return dbContext.Set<TEntity>().ToList();
        }

        public void Remove(long id)
        {

            TEntity entity = dbContext.Set<TEntity>().Find(id);
            if (entity != null) {
                dbContext.Set<TEntity>().Remove(entity);
            }
        }

    }
}
