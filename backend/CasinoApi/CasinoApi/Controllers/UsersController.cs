using CasinoApi.Dto;
using CasinoApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly UserService _userService;
        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegistrationUserDto dto)
        {
            var validationResult = _userService.ValidateRegistrationDto(dto);
            if (!validationResult.Success)
                return BadRequest(new { errors = validationResult.Errors });

            var user = _userService.CreateUserFromRegistrationDto(dto);
            var saveUserResult = await _userService.SaveUserAsync(user);
            if (!saveUserResult.Success)
                return BadRequest(new { errors = saveUserResult.Errors });

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginUserDto dto, [FromServices] JwtService _jwtService)
        {
            if(dto == null)
            {
                throw new NullReferenceException();
                //TODO: log, return
            }

            var user = await _userService.GetUserByEmailAsync(dto.Email);
            if(user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { error = "Invalid email or password" });

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token, user.Username, user.Role });
        }
    }
}
