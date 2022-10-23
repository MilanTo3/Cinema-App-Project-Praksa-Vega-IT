using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersistenceLayer.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        protected RepositoryDbContext Context { get; set; }
        protected DbSet<T> dbSet;

        public GenericRepository(RepositoryDbContext cont) {
            Context = cont;
            dbSet = Context.Set<T>();
        }

        public virtual async Task<bool> Add(T entity) {
            try {
                await dbSet.AddAsync(entity);
            }
            catch {
                return false;
            }
            return true;
        }

        public virtual async Task<bool> Delete(long id) {
            throw new NotImplementedException();
        }

        public virtual async Task<IEnumerable<T>> getAll() {
            return await dbSet.ToListAsync();
        }

        public virtual async Task<T> getById(long id) {
            return await dbSet.FindAsync(id);
        }

        public virtual Task<bool> Update(T entity) {
            throw new NotImplementedException();
        }
    }
}
