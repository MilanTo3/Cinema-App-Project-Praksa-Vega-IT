using System;
namespace DomainLayer.Exceptions;

public sealed class FailedLoginException : UnauthorizedException
{
    public FailedLoginException(string message)
        : base(message)
    {
    }
}