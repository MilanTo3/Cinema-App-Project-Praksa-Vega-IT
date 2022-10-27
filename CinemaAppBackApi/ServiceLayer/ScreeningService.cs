namespace ServiceLayer;
using ServicesAbstraction;
using Contracts;

public class ScreeningService : IScreeningService
{

    public async Task<IEnumerable<ScreeningDto>> GetAllAsync(){
        throw new NotImplementedException();
    }

    public async Task<ScreeningDto> GetByIdAsync(long id){
        throw new NotImplementedException();
    }

    public async Task<bool> CreateAsync(ScreeningDto dto){
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(long id){
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateAsync(ScreeningDto dto){
        throw new NotImplementedException();
    }

}
