namespace ServicesAbstraction;
using Contracts;
using DomainLayer.Models;

public interface IGenreService
{

    Task<IEnumerable<GenreDto>> GetAllAsync();

    Task<GenreDto> GetByNameAsync(string name);

    Task<bool> CreateAsync(GenreDto dto);

    Task<bool> DeleteAsync(string name);

    Task<bool> UpdateAsync(string name, string newname);

}