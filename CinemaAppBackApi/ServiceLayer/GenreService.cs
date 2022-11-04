namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using DomainLayer.Exceptions;

public class GenreService : IGenreService{

    private readonly IRepositoryManager _repositoryManager;
    public GenreService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<IEnumerable<GenreDto>> GetAllAsync(){

        var genres = await _repositoryManager.genreRepository.getAll();
        var genresDto = genres.Adapt<IEnumerable<GenreDto>>();

        return genresDto;
    }

    public async Task<GenreDto> GetByNameAsync(string name){

        var genre = await _repositoryManager.genreRepository.GetByName(name);
        if(genre is null){
            throw new GenreNotFoundException(name);
        }
        var genreDto = genre.Adapt<GenreDto>();

        return genreDto;
    }

    public async Task<bool> CreateAsync(GenreDto dto){

        var genre = await _repositoryManager.genreRepository.GetByName(dto.name);
        if(genre != null){
            throw new GenreAddConflictException(dto.name);
        }

        var genreReal = dto.Adapt<Genre>();
        genreReal.deleted = false;
        bool added = await _repositoryManager.genreRepository.Add(genreReal);
        await _repositoryManager.UnitOfWork.Complete();

        return added;
    }

    public async Task<bool> DeleteAsync(long id){
        
        bool deleted = false;
        var genre = await _repositoryManager.genreRepository.getById(id);
        if(genre is null){
            throw new GenreNotFoundException(id.ToString());
        }

        deleted = await _repositoryManager.genreRepository.Delete(genre.genreId);
        await _repositoryManager.UnitOfWork.Complete();

        return deleted;
    }

    public async Task<bool> UpdateAsync(long id, string newName){

        var genre = await _repositoryManager.genreRepository.getById(id);
        bool changed = await _repositoryManager.genreRepository.UpdateName(genre, newName);
        await _repositoryManager.UnitOfWork.Complete();

        return changed;
    }

    public async Task<GenreDto> GetByIdAsync(long id){

        var genre = await _repositoryManager.genreRepository.getById(id);
        if(genre is null){
            throw new GenreNotFoundException(id.ToString());
        }
        var genreDto = genre.Adapt<GenreDto>();

        return genreDto;
    }

    public async Task<DtoPaginated<GenreDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var genreDto = await _repositoryManager.genreRepository.GetPaginated(page, itemCount, letters, searchTerm);
        var genresDto = genreDto.Data.Adapt<IEnumerable<GenreDto>>().ToList();

        var sdto = new DtoPaginated<GenreDto>(){Data = genresDto, ActualCount = genreDto.ActualCount};

        return sdto;
    }

}
