using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class UserProfileService
    {
        private readonly IUserService _userService;
        private readonly IUserContextService _userContextService;

        public UserProfileService(IUserContextService userContextService, IUserService userService)
        {
            _userService = userService;
            _userContextService = userContextService;
        }

        public async Task<OperationResult<UserInfoDto>> GetProfileInfoAsync()
        {
            try
            {
                var userId = _userContextService.GetCurrentUserId();
                var user = await _userService.GetByIdAsync(userId);
                if (user == null)
                {
                    //log
                    return OperationResult<UserInfoDto>.Fail("Cannot find user");
                }

                var userInfo = new UserInfoDto
                {
                    Username = user.Username,
                    Email = user.Email,
                    Balance = user.Balance,
                    RegistrationDate = user.RegistrationDate
                };

                return OperationResult<UserInfoDto>.Ok(userInfo);
            }

            catch (Exception ex)
            {
                //log
                return OperationResult<UserInfoDto>.Fail("Server error. Exception: " + ex);
            }
        }
    }
}
