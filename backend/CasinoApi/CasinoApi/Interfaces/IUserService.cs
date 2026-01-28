using CasinoApi.Dto;
using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IUserService
    {
        Task<OperationResult> RegisterAsync(RegistrationUserDto dto);
        Task<User?> GetByEmailAsync(string email); //delete after refactor
        Task<User?> GetByIdAsync(Guid userId);
    }
}
