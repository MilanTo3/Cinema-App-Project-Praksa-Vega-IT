namespace DomainLayer.Repositories;
using DomainLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public interface IMovieRepository : IGenericRepository<Movie>
{
        Task<bool> AddId(Movie movie);

}
