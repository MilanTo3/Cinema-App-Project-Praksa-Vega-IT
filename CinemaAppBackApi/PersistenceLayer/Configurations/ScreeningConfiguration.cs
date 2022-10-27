namespace PersistenceLayer.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainLayer.Models;

public class ScreeningConfiguration : IEntityTypeConfiguration<Screening>
{

    public void Configure(EntityTypeBuilder<Screening> builder)
    {
        builder.ToTable(nameof(Screening));
        builder.HasKey(screening => screening.screeningId);
        builder.HasOne(s => s.Movie).WithMany(g => g.Screenings).HasForeignKey(x => x.movieId).IsRequired();

    }

}