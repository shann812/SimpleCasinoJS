using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class BalanceService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserContextService _userContextService;
        public BalanceService(IUserRepository userRepository, IUserContextService userContextService) 
        {
            _userRepository = userRepository;            _userContextService = userContextService;
        }

        public async Task<decimal?> GetUserBalanceAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                //log
                return null;
            } 

            return user.Balance;
        }

        public async Task<OperationResult> ChangeUserBalanceAsync(decimal amount)
        {
            var userId = _userContextService.GetCurrentUserId();
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return OperationResult.Fail("User not found");

            user.Balance += amount;
            await _userRepository.UpdateAsync(user);

            return OperationResult.Ok();
        }
    }
}
