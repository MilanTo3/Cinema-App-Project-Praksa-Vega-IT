namespace PersistenceLayer.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainLayer.Models;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{

    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.ToTable(nameof(Movie));
        builder.HasKey(movie => movie.movieId);
        builder.HasMany<Genre>(movie => movie.Genres).WithMany(x => x.Movies);
        builder.HasQueryFilter(x => !x.deleted);

    }

}