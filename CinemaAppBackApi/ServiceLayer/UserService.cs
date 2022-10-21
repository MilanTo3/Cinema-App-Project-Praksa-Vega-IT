namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;

public class UserService: IUserService
{

    private readonly IRepositoryManager _repositoryManager;
    public UserService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

     public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var users = await _repositoryManager.userRepository.GetAllAsync(cancellationToken);

            var accountsDto = users.Adapt<IEnumerable<UserDto>>();

            return accountsDto;
        }

        public async Task<UserDto> GetByIdAsync(long userid, CancellationToken cancellationToken)
        {
            var user = await _repositoryManager.userRepository.GetByIdAsync(userid, cancellationToken);
            var userdto = user.Adapt<UserDto>();

            return userdto;
        }

        public async Task<UserDto> CreateAsync(UserDto user, CancellationToken cancellationToken = default)
        {

            var account = user.Adapt<User>();
            _repositoryManager.userRepository.Insert(account);

            await _repositoryManager.UnitOfWork.Complete();

            return account.Adapt<UserDto>();
        }

        public async Task DeleteAsync(long userid, CancellationToken cancellationToken = default)
        {

            var account = await _repositoryManager.userRepository.GetByIdAsync(userid, cancellationToken);

            if (account != null)
            {
                _repositoryManager.userRepository.Remove(account);

                await _repositoryManager.UnitOfWork.Complete();
            }
            
        }

}
