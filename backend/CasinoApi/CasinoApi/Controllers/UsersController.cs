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
        private readonly UserService _userService;
        private readonly IUserContextService _userContextService;

        public UsersController(UserService userService, IUserContextService userContextService)
        {
            _userService = userService;
            _userContextService = userContextService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegistrationUserDto dto)
        {
            var validationResult = _userService.ValidateRegistrationDto(dto);
            if (!validationResult.Success)
                return BadRequest(validationResult);

            var user = _userService.CreateUserFromRegistrationDto(dto);
            var saveUserResult = await _userService.SaveUserAsync(user);
            if (!saveUserResult.Success)
                return BadRequest(saveUserResult);

            return Ok(OperationResult<string>.Ok("Accout created successfully"));
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginUserDto dto, [FromServices] JwtService _jwtService)
        {
            if(dto == null)
                return BadRequest(OperationResult.Fail("Error with dto"));

            var user = await _userService.GetUserByEmailAsync(dto.Email);
            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(OperationResult.Fail("Invalid email or password"));

            var token = _jwtService.GenerateToken(user);

            //TODO: return operationResultDto
            return Ok(new { token, user.Username, user.Role });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUserInfo()
        {
            var userId = _userContextService.GetCurrentUserId();
            var getUserInfoResult = await _userService.GetUserInfoAsync(userId);
            if(!getUserInfoResult.Success)
            {
                //log
                return BadRequest(getUserInfoResult);
            }
            return Ok(getUserInfoResult);
        }
    }
}
