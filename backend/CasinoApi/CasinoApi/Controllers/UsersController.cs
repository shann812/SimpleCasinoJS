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
    }   
}
