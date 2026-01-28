using CasinoApi.Dto;
using CasinoApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CasinoApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginUserDto dto)
        {
            var result = await _authService.LoginAsync(dto);
            return result.Success ? Ok(result) : BadRequest(result); //TODO: code of error dont work witn OperationResult, fix somehow 
        }
    }
}
