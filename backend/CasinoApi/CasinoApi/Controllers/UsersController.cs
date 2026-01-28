using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;
        private readonly UserProfileService _userProfileService;

        public UsersController(IUserService userService, UserProfileService userProfileService, IUserContextService userContextService)
        {
            _userService = userService;
            _userProfileService = userProfileService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegistrationUserDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            if (!result.Success)
            {
                //log
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUserInfoAsync()
        {
            var result = await _userProfileService.GetProfileInfoAsync();
            if(!result.Success)
            {
                //log
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
