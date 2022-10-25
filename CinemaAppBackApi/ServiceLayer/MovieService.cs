namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Collections.Generic;

public class MovieService : IMovieService
{

    private readonly IRepositoryManager _repositoryManager;
    public MovieService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public Task<bool> CreateAsync(MovieDto dto) {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(long id) {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MovieDto>> GetAllAsync() {
        throw new NotImplementedException();
    }

    public Task<MovieDto> GetByIdAsync(long id) {
        throw new NotImplementedException();
    }

    public Task<MovieDto> GetByNameAsync(string name) {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(long id, string newname) {
        throw new NotImplementedException();
    }
}
