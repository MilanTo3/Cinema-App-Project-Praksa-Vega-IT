using System;
namespace DomainLayer.Exceptions;

public sealed class UserNotFoundException : NotFoundException
{
    public UserNotFoundException(string id)
        : base($"The user with the id: {id} not found!")
    {
    }
}