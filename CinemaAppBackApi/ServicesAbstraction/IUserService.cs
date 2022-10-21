namespace ServicesAbstraction;
using Contracts;

public interface IUserService
{

    Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<UserDto> GetByIdAsync(long userid, CancellationToken cancellationToken);

    Task<UserDto> CreateAsync(UserDto dto, CancellationToken cancellationToken = default);

    Task DeleteAsync(long userid, CancellationToken cancellationToken = default);
}
