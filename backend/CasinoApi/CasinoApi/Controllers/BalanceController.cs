using CasinoApi.Dto;
using CasinoApi.Interfaces;
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
        private readonly UserService _userService;

        public BalanceController(BalanceService balanceService, IUserContextService userContextService, UserService userService)
        {
            _balanceService = balanceService;
            _userContextService = userContextService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        [Route("api/balance")]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var result = await _balanceService.GetUserBalance(userId);
            
            if(!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("api/balance/change")]
        public async Task<IActionResult> ChangeUserBalance([FromBody] ChangeBalanceDto changeBalanceDto)
        {
            var userId = _userContextService.GetCurrentUserId();
            var result = await _balanceService.ChangeUserBalance(userId, changeBalanceDto.Amount);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
