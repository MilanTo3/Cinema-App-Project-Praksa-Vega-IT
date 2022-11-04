using System;
namespace DomainLayer.Exceptions;

public sealed class GenreNotFoundException : NotFoundException
{
    public GenreNotFoundException(string name)
        : base($"The genre {name} not found!")
    {
    }
}