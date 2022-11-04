using System;
namespace DomainLayer.Exceptions;

public sealed class GenreNotFoundException : NotFoundException
{
    public GenreNotFoundException(string id)
        : base($"The genre with the id {id} not found!")
    {
    }
}