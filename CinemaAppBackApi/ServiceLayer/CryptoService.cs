namespace ServiceLayer;
using DomainLayer.Repositories;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Models;
using Mapster;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
public class CryptoService
{
    private const string pepper = "i love you";

    public static string createatoken() {

        return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
    }

    public static string hashPassword(string password){

        SHA256 hash = SHA256.Create();
        var hashedPasswordBytes = hash.ComputeHash(Encoding.Default.GetBytes(password + pepper));
        var hashedPasswordString = Convert.ToHexString(hashedPasswordBytes);
        return hashedPasswordString;
    }

}
