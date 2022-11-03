namespace PersistenceLayer.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainLayer.Models;

public class GenreConfiguration : IEntityTypeConfiguration<Genre>
{

    public void Configure(EntityTypeBuilder<Genre> builder)
    {
        builder.ToTable(nameof(Genre));
        builder.HasKey(genre => genre.genreId);
        builder.HasMany<Movie>(genre => genre.Movies).WithMany(x => x.Genres);
        builder.HasQueryFilter(x => !x.deleted);

    }

}
