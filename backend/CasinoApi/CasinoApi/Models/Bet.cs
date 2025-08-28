using CasinoApi.Enums;

namespace CasinoApi.Models
{
    public class Bet
    {
        public Guid Id { get; set; }
        public bool IsWin { get; set; }
        public decimal Price { get; set; }
        public decimal WinningsMoney { get; set; }
        public GameType Game { get; set; }
        public decimal BalanceAfter { get; set; }
        public DateTime Date { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
