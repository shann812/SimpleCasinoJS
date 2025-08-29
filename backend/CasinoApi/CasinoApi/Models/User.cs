using CasinoApi.Enums;
using Microsoft.AspNetCore.Identity;

namespace CasinoApi.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Username { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool Verificated { get; set; } = false;
        public RoleTypes Role { get; set; } = RoleTypes.User;

        public decimal Balance { get; set; } = 0;
        public List<Bet> Bets { get; set; } = new();
    }
}
