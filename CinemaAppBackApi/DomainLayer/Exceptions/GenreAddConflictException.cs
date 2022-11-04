using System;
namespace DomainLayer.Exceptions;

public sealed class GenreAddConflictException : ConflictException
{
    public GenreAddConflictException(string name)
        : base($"The genre {name} cannot be added, because the genre with that name already exists!")
    {
    }
}