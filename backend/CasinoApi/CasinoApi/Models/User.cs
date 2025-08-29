namespace CasinoApi.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Username { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool Verification { get; set; } = false;

        public decimal Balance { get; set; }
        public List<Bet> Bets { get; set; } = new();
    }
}
