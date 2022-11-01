namespace ServicesAbstraction;
using Contracts;

public interface IScreeningService
{
    Task<IEnumerable<ScreeningDto>> GetAllAsync();

    Task<ScreeningDto> GetByIdAsync(long id);

    Task<bool> CreateAsync(ScreeningDto dto);

    Task<bool> DeleteAsync(long id);

    Task<bool> UpdateAsync(ScreeningDto dto);

    Task<ScreeningsListDtoPaginated> GetPaginated(int page, int itemCount, char[]? letters, string? searchTerm);

}
