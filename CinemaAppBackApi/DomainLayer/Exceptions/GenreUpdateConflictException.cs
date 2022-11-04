using System;
namespace DomainLayer.Exceptions;

public sealed class GenreUpdateConflictException : ConflictException
{
    public GenreUpdateConflictException(string name)
        : base($"The genre: {name} already exists!")
    {
    }
}