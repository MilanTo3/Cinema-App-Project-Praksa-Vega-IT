using System;
namespace DomainLayer.Exceptions;

public sealed class MovieNotFoundException : NotFoundException
{
    public MovieNotFoundException(string id)
        : base($"The movie with the id: {id} not found!")
    {
    }
}