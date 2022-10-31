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
        reservations = reservations.Where(x => x.deleted == false);
        var reservationsDto = reservations.Adapt<IEnumerable<ReservationDto>>();

        return reservationsDto;
    }

    public async Task<IEnumerable<ReservationReturnDto>> GetAllRelP(int indicator, string email){
        
        var reservations = await _repositoryManager.reservationRepository.GetAllTimely(indicator, email);
        reservations = reservations.Where(x => x.deleted == false);

        List<ReservationReturnDto> rrdto = new List<ReservationReturnDto>();
        foreach(Reservation r in reservations){
            ReservationReturnDto rrd = new ReservationReturnDto();
            var screening = await _repositoryManager.screeningRepository.GetByIdInclusive(r.screeningId);
            rrd.title = screening.Movie.nameLocal;
            rrd.email = r.email;
            rrd.start = screening.fromScreening;
            rrd.seats = r.reservedSeats.Select(x => x.rowColumnId).ToArray();
            rrd.movieId = screening.movieId;
            rrd.totalprice = r.totalPrice;
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
                sendVerificationEmail(reservation, screening.Movie.nameLocal + "(" + screening.Movie.nameOriginal + ")");
                await _repositoryManager.UnitOfWork.Complete();
            }catch{
                return false;
            }
        }

        return added;
    }

    private void sendVerificationEmail(Reservation reservation, string name) {
        
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("cinefracinema@gmail.com"));
        email.To.Add(MailboxAddress.Parse(reservation.email));
        email.Subject = "Cinefra Ticket Booking Information";
        string k = "";
        foreach(ReservedSeat rs in reservation.reservedSeats){
            k += rs.rowColumnId;
        }
        string text = "Your reservation has been successfull!<br/><br>Your reserved seat numbers are: " + k + ".<br/>" + "Total price payed: " + reservation.totalPrice + " rsd.<br/>";
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "" +
            "<h2>Thank you for you purchase. Happy watching!</h2><p>" + text + "</p>" };

        using (var smtp = new SmtpClient()) {
            smtp.Connect("smtp.gmail.com", 587, false);
            smtp.Authenticate("cinefracinema@gmail.com", "xcqrblozlhgqreub");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

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

}
