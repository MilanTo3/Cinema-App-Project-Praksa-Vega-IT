using System;
namespace DomainLayer.Exceptions;

public abstract class ConflictException : Exception
{
    protected ConflictException(string message)
        : base(message)
    {
    }
}