namespace ServicesAbstraction;
using Contracts;
using DomainLayer.Models;

public interface IUserService
{

    Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<UserDto> GetByIdAsync(long userid, CancellationToken cancellationToken = default);

    Task<UserDto> CreateAsync(UserDto dto, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(long userid, CancellationToken cancellationToken = default);

    Task<TokenDto> LoginUserAsync(LoginUserDto loginUser);

    Task<bool> VerifyUser(string email, string token);

    Task<bool> BlockUser(long id);

}
