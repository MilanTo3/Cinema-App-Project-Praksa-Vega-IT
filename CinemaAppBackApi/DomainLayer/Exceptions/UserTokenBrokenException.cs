using System;
namespace DomainLayer.Exceptions;

public sealed class UserTokenBrokenException : UnauthorizedException
{
    public UserTokenBrokenException()
        : base($"The users token is broken!")
    {
    }
}