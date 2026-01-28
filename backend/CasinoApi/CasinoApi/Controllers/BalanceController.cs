using CasinoApi.Dto;
using CasinoApi.Interfaces;
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
        private readonly IUserContextService _userContextService;

        public BalanceController(BalanceService balanceService, IUserContextService userContextService)
        {
            _balanceService = balanceService;
            _userContextService = userContextService;
        }

        [HttpGet]
        [Authorize]
        [Route("api/balance")]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var balance = await _balanceService.GetUserBalanceAsync(userId);
            
            if(balance == null)
                return BadRequest(OperationResult<decimal>.Fail("User not found"));

            return Ok(OperationResult<decimal?>.Ok(balance));
        }

        [HttpPost]
        [Authorize]
        [Route("api/balance/change")]
        public async Task<IActionResult> ChangeUserBalanceAsync([FromBody] ChangeBalanceDto changeBalanceDto)
        {
            var userId = _userContextService.GetCurrentUserId();
            var result = await _balanceService.ChangeUserBalanceAsync(userId, changeBalanceDto.Amount);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
