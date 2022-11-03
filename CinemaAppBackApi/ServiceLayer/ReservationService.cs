namespace ServiceLayer;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Repositories;
using Mapster;
using DomainLayer.Models;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
public class ReservationService : IReservationService
{

    private readonly IRepositoryManager _repositoryManager;
    public ReservationService(IRepositoryManager repositoryManager) => _repositoryManager = repositoryManager;

    public async Task<IEnumerable<ReservationDto>> GetAllAsync(){

        var reservations = await _repositoryManager.reservationRepository.getAll();
        var reservationsDto = reservations.Adapt<IEnumerable<ReservationDto>>();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationReturnDto>> GetAllRelP(int indicator, string email){
        
        var reservations = await _repositoryManager.reservationRepository.GetAllTimely(indicator, email);

        List<ReservationReturnDto> rrdto = new List<ReservationReturnDto>();
        foreach(Reservation r in reservations){
            var screening = await _repositoryManager.screeningRepository.GetByIdInclusive(r.screeningId);
            ReservationReturnDto rrd = new ReservationReturnDto(r.reservationId, r.email, screening.Movie.nameLocal, screening.fromScreening, r.reservedSeats.Select(x => x.rowColumnId).ToArray(), r.totalPrice, screening.movieId);
            rrdto.Add(rrd);
        }

        return rrdto;
    }

    public async Task<ReservationDto> GetByIdAsync(long id){
        var reservation = await _repositoryManager.reservationRepository.getById(id);
        var reservationDto = reservation.Adapt<ReservationDto>();

        return reservationDto;
    }

    public async Task<bool> CreateAsync(ReservationDto dto){

        var reservation = dto.Adapt<Reservation>();
        foreach(string k in dto.seats){
            ReservedSeat rseat = new ReservedSeat(){ screeningId = dto.screeningId, email = dto.email, rowColumnId = k };
            reservation.reservedSeats.Add(rseat);
        }

        bool added = await _repositoryManager.reservationRepository.Add(reservation);
        if(added){
            try{
                var screening = await _repositoryManager.screeningRepository.GetByIdInclusive(dto.screeningId);
                EmailService.sendReservationEmail(reservation, screening.Movie.nameLocal + "(" + screening.Movie.nameOriginal + ")");
                await _repositoryManager.UnitOfWork.Complete();
            }catch{
                return false;
            }
        }

        return added;
    }

    public async Task<bool> DeleteAsync(long id){

        bool deleted = false;
        var reservation = await _repositoryManager.reservationRepository.getById(id);
        if(reservation == null){
            return false;
        }

        deleted = await _repositoryManager.reservationRepository.Delete(reservation.reservationId);
        await _repositoryManager.UnitOfWork.Complete();

        return deleted;
    }

    public async Task<bool> UpdateAsync(ReservationDto dto){

        var entity = dto.Adapt<Reservation>();
        bool updated = await _repositoryManager.reservationRepository.Update(entity);
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

    public async Task<IEnumerable<string>> GetReservedSeats(long id){

        List<string> seatsId = new List<string>();
        var reservations = await _repositoryManager.reservationRepository.GetReservationsForScreening(id);
        var listOflistOfSeats = reservations.Select(x => x.reservedSeats).ToList();
        foreach(List<ReservedSeat> rslist in listOflistOfSeats){
            var sel = rslist.Select(x => x.rowColumnId).ToList();
            seatsId.AddRange(sel);
        }

        return seatsId;
    }

    public async Task<bool> RateReservation(long id, long movieid, int rating){

        var reservation = await _repositoryManager.reservationRepository.getById(id);
        reservation.rating = rating;
        bool updated = await _repositoryManager.reservationRepository.Update(reservation);
        await _repositoryManager.UnitOfWork.Complete();

        //Update average movie rating score;
        var movie = await _repositoryManager.movieRepository.getByIdInclusive(movieid);
        
        await _repositoryManager.UnitOfWork.Complete();

        return updated;
    }

}
