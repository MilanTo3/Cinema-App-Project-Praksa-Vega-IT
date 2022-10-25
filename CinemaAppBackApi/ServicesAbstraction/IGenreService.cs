namespace ServicesAbstraction;
using Contracts;
using DomainLayer.Models;

public interface IGenreService
{

    Task<IEnumerable<GenreDto>> GetAllAsync();

    Task<GenreDto> GetByNameAsync(string name);

    Task<GenreDto> GetByIdAsync(long id);

    Task<bool> CreateAsync(GenreDto dto);

    Task<bool> DeleteAsync(long id);

    Task<bool> UpdateAsync(long id, string newname);

}