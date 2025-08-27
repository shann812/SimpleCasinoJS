using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace CasinoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool Verification { get; set; } = false;

        public decimal Balance { get; set; }
    }
}
