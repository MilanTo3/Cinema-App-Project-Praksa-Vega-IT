using System;
namespace DomainLayer.Exceptions;

public sealed class GenreUpdateConflictException : ConflictException
{
    public GenreUpdateConflictException(string name)
        : base($"The genre {name} cannot be updated, because the genre with that name already exists!")
    {
    }
}