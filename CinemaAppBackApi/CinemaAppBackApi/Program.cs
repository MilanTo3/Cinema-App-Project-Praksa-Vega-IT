using Microsoft.EntityFrameworkCore;
using ServicesAbstraction;
using ServiceLayer;
using DomainLayer.Repositories;
using PersistenceLayer.Repositories;
using PersistenceLayer;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ConnStr");

// Add services to the container.
//builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers().AddApplicationPart(typeof(PresentationLayer.AssemblyReference).Assembly);
builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddDbContext<RepositoryDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

//Migrations part----------------
using var scope = app.Services.CreateScope();
await using RepositoryDbContext dbContext = scope.ServiceProvider.GetRequiredService<RepositoryDbContext>();
await dbContext.Database.MigrateAsync();
//Migrations part----------------
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();

