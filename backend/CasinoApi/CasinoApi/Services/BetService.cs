using CasinoApi.Dto;
using CasinoApi.Factories;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class BetService
    {
        private readonly IBetRepository _betRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserContextService _userContextService;
        private readonly IUnitOfWork _uow;

        public BetService(
            IBetRepository betRepository,
            IUserRepository userRepository, 
            IUserContextService userContextService,
            IUnitOfWork uow)
        {
            _betRepository = betRepository;
            _userRepository = userRepository;
            _uow = uow;
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

                var bet = PlaceBetFactory.CreateFromDto(placeBetDto, user); //TODO: balance can be negative ?

                user.Balance += bet.WinningsMoney;
                _betRepository.Add(bet);
                await _uow.SaveChangesAsync();
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
