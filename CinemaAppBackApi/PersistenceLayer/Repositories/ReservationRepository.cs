namespace PersistenceLayer.Repositories;
using DomainLayer.Models;
using DomainLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using System.Text;
using Contracts;
public class ReservationRepository: GenericRepository<Reservation>, IReservationRepository
{

    public ReservationRepository(RepositoryDbContext _context): base(_context) {
    }

    public override async Task<bool> Delete(long id) {

        try {
            var exist = await dbSet.Where(x => x.reservationId == id).FirstOrDefaultAsync();
            if (exist != null) {
                exist.deleted = true;
            }

        }catch(Exception ex) {
            return false;
        }
        return true;
    }

    public override async Task<bool> Update(Reservation reservation) {

        try {
            var updatereservation = await dbSet.Where(x => x.reservationId == reservation.reservationId).FirstOrDefaultAsync();

            updatereservation.totalPrice = reservation.totalPrice;
            updatereservation.deleted = reservation.deleted;
            
        }
        catch (Exception ex) {
            return false;
        }
        return true;
    }

    public async Task<bool> AddReservation(Reservation reservation){
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Reservation>> GetReservationsForScreening(long id){

        var reservations = await dbSet.Include(x => x.reservedSeats).Where(x => x.screeningId == id && x.deleted == false).ToListAsync();
        return reservations;
    }

    public async Task<IEnumerable<Reservation>> GetAllTimely(int indicator, string email){

        var reservations = await dbSet.Include(x => x.reservedSeats).Include(x => x.screening).Where(x => x.deleted == false && x.screening.fromScreening >= DateTime.Now && x.email == email).ToListAsync();
        
        if(indicator == 1){
            reservations = await dbSet.Include(x => x.reservedSeats).Include(x => x.screening).Where(x => x.deleted == false && x.screening.fromScreening < DateTime.Now && x.email == email).ToListAsync();
        }

        return reservations;
    }

}