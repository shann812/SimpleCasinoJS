using CasinoApi.Data;
using CasinoApi.Dto;
using CasinoApi.Enums;
using CasinoApi.Interfaces;
using CasinoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Services
{
    public class BetService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserService _userService;
        private readonly BalanceService _balanceService;
        private readonly IUserContextService _userContextService;

        public BetService(ApplicationDbContext db, UserService userService, BalanceService balanceService, 
            IUserContextService userContextService)
        {
            _db = db;
            _userService = userService;
            _balanceService = balanceService;
            _userContextService = userContextService;
        }

        public async Task<OperationResult> PlaceBetAsync(PlaceBetDto placeBetDto)
        {
            try
            {
                var userId = _userContextService.GetCurrentUserId();
                var createBetResult = await TryCreateBetFromDtoAsync(placeBetDto, userId);
                if (!createBetResult.Success)
                    return createBetResult;

                _db.Bets.Add(createBetResult.Data);
                await _db.SaveChangesAsync();

                var changeUserBalanceResult = await _balanceService.ChangeUserBalanceAsync(userId, createBetResult.Data.WinningsMoney);
                if (!changeUserBalanceResult.Success)
                {
                    //log
                    _db.Bets.Remove(createBetResult.Data);
                    await _db.SaveChangesAsync();
                    return changeUserBalanceResult;
                }

                return OperationResult.Ok();
            }
            catch(Exception ex)
            {
                //log
                return OperationResult.Fail("Unexpected error occurred while placing your bet.");
            }
        }

        private async Task<OperationResult<Bet>> TryCreateBetFromDtoAsync(PlaceBetDto placeBetDto, Guid userId)
        {
            if (!Enum.TryParse<GameType>(placeBetDto.Game, ignoreCase: true, out var gameType)) 
            {
                //log
                return OperationResult<Bet>.Fail($"Invalid game type: '{placeBetDto.Game}'.");
            }

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                //log
                return OperationResult<Bet>.Fail($"User with ID '{userId}' not found. Cannot place bet.");
            }

            var userBalance = await _balanceService.GetUserBalanceAsync(userId);
            if(userBalance == null)
            {
                //log
                return OperationResult<Bet>.Fail($"Failed to retrieve balance for user '{userId}'.");
            }


            var bet = new Bet()
            {
                IsWin = placeBetDto.IsWin,
                Price = placeBetDto.BetPrice,
                WinningsMoney = placeBetDto.Winnings,
                Game = gameType,
                BalanceAfter = (decimal)userBalance + placeBetDto.Winnings, //idk
                Date = DateTime.UtcNow,
                UserId = userId,
            };
            return OperationResult<Bet>.Ok(bet);
        }

        public async Task<OperationResult<List<BetDto>>> GetUserBetsAsync(Guid userId, int skip, int take)
        {
            if(take > 100) 
                take = 100; //max 100 records for one request

            try
            {
                var userBets = await _db.Bets
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

                return OperationResult<List<BetDto>>.Ok(userBets);
            }
            catch(Exception ex)
            {
                //log
                return OperationResult<List<BetDto>>.Fail("Unexpected error occurred while getting your bets.");
            }
        }
    }
}
