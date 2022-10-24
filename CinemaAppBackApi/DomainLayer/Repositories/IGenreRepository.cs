using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Repositories
{
    public interface IGenreRepository: IGenericRepository<Genre>
    {

        Task<Genre> GetByName(string name);
        Task<bool> UpdateName(Genre genre, string newname);

    }
}
