namespace ServiceLayer;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Repositories;
using Mapster;
using DomainLayer.Models;

public class ScreeningService : IScreeningService
{

    private readonly IRepositoryManager _repositoryManager;
    public ScreeningService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;
    public async Task<IEnumerable<ScreeningDto>> GetAllAsync(){
        
        var screeningDto = await _repositoryManager.screeningRepository.GetAllInclusive();
        var screeningsDto = screeningDto.Adapt<IEnumerable<ScreeningDto>>().ToList();

        for(int i = 0; i < screeningDto.Count(); i++){
            screeningsDto[i].name = screeningDto.ElementAt(i).Movie.nameLocal;
        }

        return screeningsDto;
    }

    public async Task<ScreeningDto> GetByIdAsync(long id){
        var screening = await _repositoryManager.screeningRepository.GetByIdInclusive(id);
        var screeningDto = screening.Adapt<ScreeningDto>();
        screeningDto.name = screening.Movie.nameLocal;

        return screeningDto;
    }

    public async Task<bool> CreateAsync(ScreeningDto dto){
        
        var Screening = dto.Adapt<Screening>();
        Screening.Movie = await _repositoryManager.movieRepository.getById(dto.movieId);
        bool added = await _repositoryManager.screeningRepository.Add(Screening);
        await _repositoryManager.UnitOfWork.Complete();

        return added;
    }

    public async Task<bool> DeleteAsync(long id){
        bool deleted = false;
        var screening = await _repositoryManager.screeningRepository.getById(id);
        if(screening == null){
            return false;
        }

        deleted = await _repositoryManager.screeningRepository.Delete(screening.screeningId);
        await _repositoryManager.UnitOfWork.Complete();

        return deleted;
    }

    public async Task<bool> UpdateAsync(ScreeningDto dto){
        
        var entity = dto.Adapt<Screening>();
        bool updated = await _repositoryManager.screeningRepository.Update(entity);
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

    public async Task<DtoPaginated<ScreeningDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var screeningDto = await _repositoryManager.screeningRepository.GetPaginated(page, itemCount, letters, searchTerm);
        var screeningsDto = screeningDto.Data.Adapt<IEnumerable<ScreeningDto>>().ToList();

        for(int i = 0; i < screeningsDto.Count(); i++){
            var screen = await _repositoryManager.screeningRepository.GetByIdInclusive((long)screeningsDto[i].screeningId);
            screeningsDto[i].name = screen.Movie.nameLocal;
        }

        var sdto = new DtoPaginated<ScreeningDto>(){Data = screeningsDto, ActualCount = screeningDto.ActualCount};

        return sdto;
    }

}
