using CasinoApi.Data;
using CasinoApi.Interfaces;
using CasinoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;
        public UserRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }

        public async Task<User?> GetByIdAsync(Guid userId)
            => await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);

        public async Task<User?> GetByEmailAsync(string email)
            => await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}
