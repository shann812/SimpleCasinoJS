using CasinoApi.Dto;
using CasinoApi.Enums;
using CasinoApi.Models;

namespace CasinoApi.Factories
{
    public static class PlaceBetFactory
    {
        public static Bet CreateFromDto(PlaceBetDto dto, User user)
        {
            if (!Enum.TryParse<GameType>(dto.Game, true, out var gameType))
                throw new Exception("Invalid game type");

            return new Bet()
            {
                IsWin = dto.IsWin,
                Price = dto.BetPrice,
                WinningsMoney = dto.Winnings,
                Game = gameType,
                BalanceAfter = (decimal)user.Balance + dto.Winnings, //idk
                Date = DateTime.UtcNow,
                UserId = user.Id,
            };
        }
    }
}
