using CasinoApi.Data;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class BalanceService
    {
        private readonly ApplicationDbContext _db;
        private readonly IUserService _userService;
        public BalanceService(ApplicationDbContext db, IUserService userService) 
        { 
            _db = db;
            _userService = userService;
        }

        public async Task<decimal?> GetUserBalanceAsync(Guid userId)
        {
            var user = await _userService.GetByIdAsync(userId);
            if (user == null)
            {
                //log
                return null;
            } 

            return user.Balance;
        }

        public async Task<OperationResult> ChangeUserBalanceAsync(Guid userId, decimal amount)
        {
            var user = await _userService.GetByIdAsync(userId);
            if (user == null)
                return OperationResult.Fail("User not found");

            user.Balance += amount;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();

            return OperationResult.Ok();
        }
    }
}
