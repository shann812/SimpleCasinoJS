using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;
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

        public BetsController(BetService betService, IUserContextService userContextService)
        {
            _betService = betService;
        }

        [Authorize]
        [HttpPost("place")]
        public async Task<IActionResult> PlaceBetAsync([FromBody] PlaceBetDto placeBetDto)
        {
            var result = await _betService.PlaceBetAsync(placeBetDto);
            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(OperationResult<string>.Ok("Bet places successfully"));
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyBets(int skip = 0, int take = 5)
        {
            if (skip < 0 || take <= 0)
                return BadRequest("Invalid pagination parameters");

            
            var result = await _betService.GetUserBetsAsync(skip, take);
            if (!result.Success)
            {
                //log
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
