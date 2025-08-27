namespace CasinoApi.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public bool IsWin { get; set; }
        public decimal Price { get; set; }
        public decimal WinningsMoney { get; set; }
        public GameType Game { get; set; }
        public decimal BalanceAfter { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
