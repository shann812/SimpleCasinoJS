using CasinoApi.Dto;
using CasinoApi.Factories;
using CasinoApi.Interfaces;
using CasinoApi.Models;
using CasinoApi.Repositories;

namespace CasinoApi.Services
{
    public class BetService
    {
        private readonly IBetRepository _betRepository; //тут сделаю интерфейс
        private readonly PlaceBetFactory _placeBetFactory;
        private readonly IUserRepository _userRepository;
        private readonly IUserContextService _userContextService;

        public BetService(IBetRepository betRepository, 
            PlaceBetFactory placeBetFactory, 
            IUserRepository userRepository, 
            IUserContextService userContextService)
        {
            _betRepository = betRepository;
            _placeBetFactory = placeBetFactory;
            _userRepository = userRepository;
            _userContextService = userContextService;
        }

        public async Task<OperationResult> PlaceBetAsync(PlaceBetDto placeBetDto)
        {
            try
            {
                var userId = _userContextService.GetCurrentUserId();
                var user = await _userRepository.GetByIdAsync(userId);
                if(user is null)
                    return OperationResult.Fail("User is null");

                var bet = _placeBetFactory.CreateFromDto(placeBetDto, user); //TODO: balance can be negative ?

                user.Balance += bet.WinningsMoney;
                _betRepository.Add(bet);
                await _userRepository.SaveChangesAsync();
                return OperationResult.Ok();
            }
            catch(Exception ex)
            {
                //log
                return OperationResult.Fail("Unexpected error occurred while placing your bet. Ex: " + ex);
            }
        }

        public async Task<OperationResult<List<BetDto>>> GetUserBetsAsync(int skip, int take)
        {
            if(take > 100) 
                take = 100; //max 100 records for one request

            try
            {
                var userId = _userContextService.GetCurrentUserId();
                var userBets = await _betRepository.GetUserBets(userId, skip, take);
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
