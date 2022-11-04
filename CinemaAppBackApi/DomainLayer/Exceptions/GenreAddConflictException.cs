using System;
namespace DomainLayer.Exceptions;

public sealed class GenreAddConflictException : ConflictException
{
    public GenreAddConflictException(string name)
        : base($"The genre {name} already exists!")
    {
    }
}