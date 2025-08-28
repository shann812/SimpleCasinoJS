using CasinoApi.Services;
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

        [Route("api/[controller]")]
        [HttpGet]
        public async Task<IActionResult> GetBalanceAsync()
        {
            var userId = GetIdFromToken();
            var balance = await _balanceService.GetBalance(userId);
            return Ok(balance);
        }
    }
}
