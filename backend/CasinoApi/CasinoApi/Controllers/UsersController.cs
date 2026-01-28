using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;
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
        private readonly IUserContextService _userContextService;

        public UsersController(IUserService userService, UserProfileService userProfileService, IUserContextService userContextService)
        {
            _userService = userService;
            _userProfileService = userProfileService;
            _userContextService = userContextService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegistrationUserDto dto)
        {
            var result = await _userService.RegisterAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result);
        }

        //TODO: create AuthService
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginUserDto dto, [FromServices] JwtService _jwtService)
        {
            if(dto == null)
                return BadRequest(OperationResult.Fail("Error with dto"));

            var user = await _userService.GetByEmailAsync(dto.Email);
            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(OperationResult.Fail("Invalid email or password"));

            var token = _jwtService.GenerateToken(user);

            var data = new LoginResponseDto
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            };
            return Ok(OperationResult<LoginResponseDto>.Ok(data));
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUserInfoAsync()
        {
            var userId = _userContextService.GetCurrentUserId();
            var getUserInfoResult = await _userProfileService.GetUserProfileInfoAsync(userId);
            if(!getUserInfoResult.Success)
            {
                //log
                return BadRequest(getUserInfoResult);
            }
            return Ok(getUserInfoResult);
        }
    }
}
