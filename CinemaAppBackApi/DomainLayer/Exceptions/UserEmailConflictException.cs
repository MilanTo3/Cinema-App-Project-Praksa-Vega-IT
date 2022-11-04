using System;
namespace DomainLayer.Exceptions;

public sealed class UserEmailConflictException : ConflictException
{
    public UserEmailConflictException()
        : base("User with the specified email is already registered!")
    {
    }
}