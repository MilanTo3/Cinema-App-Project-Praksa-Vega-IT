namespace ServiceLayer;
using ServicesAbstraction;
using Contracts;
using DomainLayer.Repositories;
using Mapster;
using DomainLayer.Models;

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

    public async Task<ReservationDto> GetByIdAsync(long id){
        var reservation = await _repositoryManager.reservationRepository.getById(id);
        var reservationDto = reservation.Adapt<ReservationDto>();

        return reservationDto;
    }

    public async Task<bool> CreateAsync(ReservationDto dto){

        var reservation = dto.Adapt<Reservation>();
        foreach(string rs in dto.seats){
            
        }
        reservation.deleted = false;
        bool added = await _repositoryManager.reservationRepository.Add(reservation);
        await _repositoryManager.UnitOfWork.Complete();

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

}
