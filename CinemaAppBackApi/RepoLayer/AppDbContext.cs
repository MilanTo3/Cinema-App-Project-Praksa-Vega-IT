using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepoLayer
{
    public class AppDbContext: DbContext
    {

        public AppDbContext(DbContextOptions connection): base(connection)
        {

        }

        public DbSet<User> users { get; set; }
    }
}
