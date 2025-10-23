namespace CasinoApi.Dto
{
    public class PlaceBetDto
    {
        public bool IsWin { get; set; }
        public decimal BetPrice { get; set; }
        public decimal Winnings { get; set; }
        public string Game { get; set; }
    }
}