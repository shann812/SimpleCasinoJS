using CasinoApi.Data;
using CasinoApi.Dto;
using CasinoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _db;
        public UserService(ApplicationDbContext db)
        {
            _db = db;
        }

        public OperationResult ValidateRegistrationDto(RegistrationUserDto dto)
        {
            var result = new OperationResult();

            if (string.IsNullOrWhiteSpace(dto.Username) || dto.Username.Length < 4 || dto.Username.Length > 20)
            {
                result.Success = false;
                result.Errors.Add("Username must be 4-20 characters long.");
            }

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
            {
                result.Success = false;
                result.Errors.Add("Password must be at least 6 characters long.");
            }

            if (_db.Users.Any(u => u.Email == dto.Email))
            {
                result.Success = false;
                result.Errors.Add("This email is already taken.");
            }

            if (dto.Password != dto.PasswordRepeat)
            {
                result.Success = false;
                result.Errors.Add("Passwords do not match.");
            }

            return result;
        }

        public User CreateUserFromRegistrationDto(RegistrationUserDto dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Username = dto.Username,
                RegistrationDate = DateTime.UtcNow,
                Verificated = false,
                Role = Enums.RoleTypes.User,
                Balance = 0
            };

            return user;
        }

        public async Task<OperationResult> SaveUserAsync(User user)
        {
            var result = new OperationResult();

            try
            {
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
                result.Success = true;
            }
            catch (Exception ex)
            {
                result = OperationResult.Fail("An error occurred while saving the user.");
                // Log the exception (ex) if needed
            }

            return result;
        }

        public async Task<User?> GetUserByEmailAsync(string email) 
            => await _db.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetUserById(Guid userId) 
            => await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }
}
