namespace PersistenceLayer.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainLayer.Models;
public class ReservationConfiguration: IEntityTypeConfiguration<Reservation>
{

    public void Configure(EntityTypeBuilder<Reservation> builder)
    {
        builder.ToTable(nameof(Reservation));
        builder.HasKey(reservation => reservation.reservationId);
        builder.HasOne(s => s.screening).WithMany(g => g.Reservations).HasForeignKey(x => x.screeningId).IsRequired();

    }

}
