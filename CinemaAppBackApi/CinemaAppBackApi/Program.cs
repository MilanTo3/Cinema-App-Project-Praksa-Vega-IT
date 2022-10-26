using Microsoft.EntityFrameworkCore;
using ServicesAbstraction;
using ServiceLayer;
using DomainLayer.Repositories;
using PersistenceLayer.Repositories;
using PersistenceLayer;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ConnStr");

// Add services to the container.
//builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers().AddApplicationPart(typeof(PresentationLayer.AssemblyReference).Assembly);

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build => {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddDbContext<RepositoryDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();
app.UseCors("corspolicy");
//Migrations part----------------

//Migrations part----------------
// Configure the HTTP request pipeline.
app.UseStaticFiles(new StaticFileOptions(){
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
    RequestPath = new PathString("/Resources")
});

app.UseAuthorization();

app.MapControllers();

app.Run();

