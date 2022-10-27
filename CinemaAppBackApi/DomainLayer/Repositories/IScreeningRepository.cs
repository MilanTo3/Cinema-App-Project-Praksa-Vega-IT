namespace DomainLayer.Repositories;
using DomainLayer.Models;
public interface IScreeningRepository : IGenericRepository<Screening>
{

    public Task<IEnumerable<Screening>> GetAllInclusive();
    public Task<Screening> GetByIdInclusive(long screeningId);
    
}
