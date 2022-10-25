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

public class MovieService : IMovieService
{

    private readonly IRepositoryManager _repositoryManager;
    public MovieService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

}
