using CasinoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    public class BalanceController : Controller
    {
        private readonly BalanceService _balanceService;
        private readonly UserContextService _userContextService;

        public BalanceController(BalanceService balanceService, UserContextService userContextService)
        {
            _balanceService = balanceService;
            _userContextService = userContextService;
        }

        [Route("api/[controller]")]
        [HttpGet]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var balance = await _balanceService.GetBalanceAsync(userId);
            return Ok(balance);
        }
    }
}
