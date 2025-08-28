using CasinoApi.Interfaces;
using System.Security.Claims;

namespace CasinoApi.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var claim = user?.FindFirst(ClaimTypes.NameIdentifier);
            return Guid.Parse(claim?.Value ?? throw new Exception("User ID not found"));
        }
    }
}
