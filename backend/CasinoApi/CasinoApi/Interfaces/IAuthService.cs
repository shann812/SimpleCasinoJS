using CasinoApi.Dto;
using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IAuthService
    {
        Task<OperationResult<LoginResponseDto>> LoginAsync(LoginUserDto dto);
    }
}
