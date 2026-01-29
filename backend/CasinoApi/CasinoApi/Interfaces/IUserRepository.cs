using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(User user);
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
    }
}
