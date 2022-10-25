namespace ServicesAbstraction;
using Contracts;
using DomainLayer.Models;

public interface IMovieService
{

    Task<IEnumerable<MovieDto>> GetAllAsync();

    Task<MovieDto> GetByNameAsync(string name);

    Task<MovieDto> GetByIdAsync(long id);

    Task<bool> CreateAsync(MovieDto dto);

    Task<bool> DeleteAsync(long id);

    Task<bool> UpdateAsync(long id, string newname);

}
