using CasinoApi.Data;
using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Repositories
{
    public class BetRepository : IBetRepository
    {
        private readonly ApplicationDbContext _db;
        public BetRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public void Add(Bet bet)
            => _db.Bets.Add(bet);

        //TODO: refactor skip/take
        public async Task<List<BetDto>> GetUserBets(Guid userId, int skip, int take)
        {
            return await _db.Bets
                .Where(bet => bet.UserId == userId)
                .OrderByDescending(bet => bet.Date)
                .Skip(skip)
                .Take(take)
                .Select(bet => new BetDto
                {
                    IsWin = bet.IsWin,
                    WinningsMoney = bet.WinningsMoney,
                    Game = bet.Game.ToString(),
                    BalanceAfter = bet.BalanceAfter,
                    Date = bet.Date
                })
                .ToListAsync();
        }
    }
}
