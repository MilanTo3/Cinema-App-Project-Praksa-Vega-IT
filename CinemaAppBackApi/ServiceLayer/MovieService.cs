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
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using DomainLayer.Exceptions;
using System.IO;

public class MovieService : IMovieService
{

    private readonly IRepositoryManager _repositoryManager;
    public MovieService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<bool> CreateAsync(MovieDto dto, string path) {
        
        var moveiReal = dto.Adapt<Movie>();

        bool added = await _repositoryManager.movieRepository.AddId(moveiReal);
        bool madeImage = false;

        if(added){

            foreach(string genre in dto.genres){
                Genre g = await _repositoryManager.genreRepository.GetByName(genre);
                moveiReal.Genres.Add(g);
            }
            await _repositoryManager.UnitOfWork.Complete();
            madeImage = saveImage(dto.imageFile, path, "movie" + moveiReal.movieId);
            
        }

        return added && madeImage;
    }

    public FileInfo GetImageFile(long id){

        string pathToRead = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
        DirectoryInfo d = new DirectoryInfo(pathToRead);
        FileInfo[] Files = d.GetFiles();
        FileInfo file = Files.ToList().FirstOrDefault(x => x.Name.Split('.')[0] == ("movie" + id.ToString()));

        return file;
    }

    private bool saveImage(IFormFile image, string path, string name)
    {

        string extension = image.FileName.Split('.')[1];
        string filePath = Path.Combine(path, name + "." + extension);

        try{
            using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                image.CopyTo(fileStream);
            }
        }catch{
            return false;
        }

        return true;
    }

    public async Task<bool> DeleteAsync(long id) {
        bool deleted = false;
        var movie = await _repositoryManager.movieRepository.getById(id);
        if(movie is null){
            throw new MovieNotFoundException(id.ToString());
        }

        deleted = await _repositoryManager.movieRepository.Delete(movie.movieId);
        await _repositoryManager.UnitOfWork.Complete();

        return deleted;
    }

    public async Task<IEnumerable<MovieDto>> GetAllAsync() {
        var movieDto = await _repositoryManager.movieRepository.getAll();
        var genresDto = movieDto.Adapt<IEnumerable<MovieDto>>();

        return genresDto;
    }

    public async Task<MovieDto> GetByIdAsync(long id) {
        var movie = await _repositoryManager.movieRepository.getById(id);
        var movieDto = movie.Adapt<MovieDto>();

        movieDto.genres = new List<string>();
        foreach(Genre genre in movie.Genres){
            movieDto.genres.Add(genre.name);
        }

        return movieDto;
    }

    public async Task<bool> UpdateAsync(MovieDto dto) {
        
        List<Genre> newGen = new List<Genre>();
        foreach(string name in dto.genres){
            newGen.Add(await _repositoryManager.genreRepository.GetByName(name));
        }

        bool updated = await _repositoryManager.movieRepository.UpdateMovie(dto, newGen);
        if(updated && dto.imageFile != null){
            string pathToWrite = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
            saveImage(dto.imageFile, pathToWrite, "movie" + dto.movieId);
        }
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

    public async Task<IEnumerable<MovieScreeningDto>> GetMoviesWithScreenings(DateTime? day, List<string>? genres, bool? sort){

        List<Genre>? g = null;

        if(genres != null && genres.Count != 0){
            g = new List<Genre>();
            foreach(string k in genres){
                g.Add(await _repositoryManager.genreRepository.GetByName(k));
            }
        }

        var moviesWithScreenings = await _repositoryManager.movieRepository.GetMoviesWithScreenings(day, g, sort);

        List<MovieScreeningDto> dtos = new List<MovieScreeningDto>();
        foreach(Movie m in moviesWithScreenings){
            MovieScreeningDto dto = m.Adapt<MovieScreeningDto>();
            dto.genres = m.Genres.Select(x => x.name).ToList();
            foreach(Screening s in m.Screenings){
                dto.movieScreenings.Add(s.Adapt<ScreeningDto2>());
            }
            dtos.Add(dto);
        }
        
        return dtos;
    }

    public async Task<DtoPaginated<MovieDto>> GetPaginated(int page, int itemCount, string[]? letters, string? searchTerm){

        var movieDto = await _repositoryManager.movieRepository.GetPaginated(page, itemCount, letters, searchTerm);
        var moviesDto = movieDto.Data.Adapt<IEnumerable<MovieDto>>().ToList();

        var sdto = new DtoPaginated<MovieDto>(){Data = moviesDto, ActualCount = movieDto.ActualCount};

        return sdto;
    }

}
