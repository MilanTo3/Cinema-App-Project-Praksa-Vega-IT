using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Repositories
{
    public interface IRepositoryManager
    {

        IUnitofWork UnitOfWork {get;}
        IUserRepository userRepository{get;}
        IGenreRepository genreRepository{get;}

    }
}
