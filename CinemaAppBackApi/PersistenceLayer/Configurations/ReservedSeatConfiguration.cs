namespace PersistenceLayer.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DomainLayer.Models;
public class ReservedSeatConfiguration: IEntityTypeConfiguration<ReservedSeat>
{

    public void Configure(EntityTypeBuilder<ReservedSeat> builder)
    {
        builder.ToTable(nameof(ReservedSeat));
        builder.HasKey(seat => seat.seatId);
        builder.HasOne(s => s.reservation).WithMany(g => g.reservedSeats).HasForeignKey(x => x.reservationId).IsRequired();
        builder.HasQueryFilter(x => !x.deleted);

    }

}