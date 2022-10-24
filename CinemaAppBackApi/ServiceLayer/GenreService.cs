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
        var genreDto = genre.Adapt<GenreDto>();

        return genreDto;
    }

    public async Task<bool> CreateAsync(GenreDto dto){

        var genre = await _repositoryManager.genreRepository.GetByName(dto.name);
        if(genre != null){
           return false; 
        }

        var genreReal = dto.Adapt<Genre>();
        bool added = await _repositoryManager.genreRepository.Add(genreReal);
        await _repositoryManager.UnitOfWork.Complete();

        return added;
    }

    public async Task<bool> DeleteAsync(string name){
        
        bool deleted = false;
        var genre = await _repositoryManager.genreRepository.GetByName(name);
        if(genre == null){
            return false;
        }

        deleted = await _repositoryManager.genreRepository.Delete(genre.genreId);
        await _repositoryManager.UnitOfWork.Complete();

        return deleted;
    }

    public async Task<bool> UpdateAsync(string name, string newName){

        var genre = await _repositoryManager.genreRepository.GetByName(name);
        bool changed = await _repositoryManager.genreRepository.UpdateName(genre, newName);
        await _repositoryManager.UnitOfWork.Complete();

        return changed;
    }

}
