using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthService(IUserRepository userService, JwtService jwtService)
        {
            _userRepository = userService;
            _jwtService = jwtService;
        }

        public async Task<OperationResult<LoginResponseDto>> LoginAsync(LoginUserDto dto)
        {
            if (dto == null)
                return OperationResult<LoginResponseDto>.Fail("Error with dto");

            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return OperationResult<LoginResponseDto>.Fail("Invalid email or password");

            var token = _jwtService.GenerateToken(user);

            var data = new LoginResponseDto
            {
                Token = token,
                Username = user.Username,
                Role = user.Role
            };
            return OperationResult<LoginResponseDto>.Ok(data);
        }
    }
}
