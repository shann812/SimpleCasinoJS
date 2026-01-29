using CasinoApi.Interfaces;
using CasinoApi.Models;
using Microsoft.AspNetCore.Components.Forms;

namespace CasinoApi.Services
{
    public class BalanceService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserContextService _userContextService;
        private readonly IUnitOfWork _uow;
        public BalanceService(IUserRepository userRepository, IUserContextService userContextService, IUnitOfWork uow) 
        {
            _userRepository = userRepository;            _userContextService = userContextService;
            _uow = uow;
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
            await _uow.SaveChangesAsync();

            return OperationResult.Ok();
        }
    }
}
