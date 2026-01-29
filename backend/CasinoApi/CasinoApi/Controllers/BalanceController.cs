using CasinoApi.Dto;
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

        public BalanceController(BalanceService balanceService)
        {
            _balanceService = balanceService;
        }

        [HttpGet]
        [Authorize]
        [Route("api/balance")]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var balance = await _balanceService.GetUserBalanceAsync();
            
            if(balance == null)
                return BadRequest(OperationResult<decimal>.Fail("User not found"));

            return Ok(OperationResult<decimal?>.Ok(balance));
        }

        [HttpPost]
        [Authorize]
        [Route("api/balance/change")]
        public async Task<IActionResult> ChangeUserBalanceAsync([FromBody] ChangeBalanceDto changeBalanceDto)
        {
            var result = await _balanceService.ChangeUserBalanceAsync(changeBalanceDto.Amount);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
