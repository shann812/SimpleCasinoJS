using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    [Route("api/bets")]
    public class BetsController : Controller
    {
        private readonly BetService _betService;
        private readonly IUserContextService _userContextService;

        public BetsController(BetService betService, IUserContextService userContextService)
        {
            _betService = betService;
            _userContextService = userContextService;
        }

        //rename
        [Authorize]
        [HttpPost("place")]
        public async Task<IActionResult> PlaceBet([FromBody] RecordBetDto recordBetDto)
        {
            //add = DateTime.UtcNow; in bet model
            return Ok();
        }
    }
}
