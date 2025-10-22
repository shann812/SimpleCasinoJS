using CasinoApi.Enums;

namespace CasinoApi.Dto
{
    public class BetInfoDto
    {
        public bool IsWin { get; set; }
        public decimal WinningsMoney { get; set; }
        public GameType Game { get; set; }
        public decimal BalanceAfter { get; set; }
        public DateTime Date { get; set; }
    }
}
