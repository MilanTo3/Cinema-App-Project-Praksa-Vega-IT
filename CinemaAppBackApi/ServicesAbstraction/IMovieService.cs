namespace ServicesAbstraction;
using Contracts;
using DomainLayer.Models;

public interface IMovieService
{

    Task<IEnumerable<MovieDto>> GetAllAsync();

    Task<MovieDto> GetByIdAsync(long id);

    Task<IEnumerable<MovieScreeningDto>> GetMoviesWithScreenings(DateTime? day, List<string>? genres, bool? sort);

    Task<bool> CreateAsync(MovieDto dto, string path);

    Task<bool> DeleteAsync(long id);

    Task<bool> UpdateAsync(MovieDto dto);

    Task<DtoPaginated<MovieDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm);

}
