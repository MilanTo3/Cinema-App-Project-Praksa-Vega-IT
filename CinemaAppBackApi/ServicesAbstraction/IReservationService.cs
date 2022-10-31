namespace ServicesAbstraction;
using Contracts;

public interface IReservationService
{

    Task<IEnumerable<ReservationDto>> GetAllAsync();

    Task<ReservationDto> GetByIdAsync(long id);

    Task<bool> CreateAsync(ReservationDto dto);

    Task<bool> DeleteAsync(long id);

    Task<bool> UpdateAsync(ReservationDto dto);

    Task<IEnumerable<string>> GetReservedSeats(long id);

    Task<IEnumerable<ReservationReturnDto>> GetAllRelP(int indicator, string email);

}
