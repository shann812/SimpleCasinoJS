using CasinoApi.Enums;

namespace CasinoApi.Dto
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public RoleTypes Role { get; set; }
    }
}
