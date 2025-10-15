using CasinoApi.Models;
using CasinoApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    public class BalanceController : Controller
    {
        private readonly BalanceService _balanceService;
        private readonly UserContextService _userContextService;
        private readonly UserService _userService;

        public BalanceController(BalanceService balanceService, UserContextService userContextService, UserService userService)
        {
            _balanceService = balanceService;
            _userContextService = userContextService;
            _userService = userService;
        }

        [Authorize]
        [Route("api/GetBalance")]
        [HttpGet]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var result = await _balanceService.GetUserBalance(userId);
            
            if(!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [Route("api/ChangeBalance")]
        [HttpGet]
        public async Task<IActionResult> ChangeUserBalance(decimal amount)
        {
            var userId = _userContextService.GetCurrentUserId();
            var result = await _balanceService.ChangeUserBalance(userId, amount);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
        //TODO: add balance change api methods and test it
    }
}
