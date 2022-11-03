namespace DomainLayer.Repositories;
using DomainLayer.Models;
using Contracts;
public interface IScreeningRepository : IGenericRepository<Screening>
{

    public Task<IEnumerable<Screening>> GetAllInclusive();
    public Task<Screening> GetByIdInclusive(long screeningId);

    public Task<DtoPaginated<Screening>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm);
    
}
