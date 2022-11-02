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

    Task<bool> RequestPassReset(string email, string text);

    Task<bool> ResetPassword(string email, string token, string newpassword);
    Task<DtoPaginated<UserDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm);

}
