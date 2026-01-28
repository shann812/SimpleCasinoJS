using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Factories
{
    public class RegistrationUserFactory : IUserFactory<RegistrationUserDto>
    {
        public User Create(RegistrationUserDto dto)
        {
            return new User
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
        }
    }
}
