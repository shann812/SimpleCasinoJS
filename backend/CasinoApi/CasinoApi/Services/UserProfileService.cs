using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class UserProfileService
    {
        private readonly IUserService _userService;

        public UserProfileService(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<OperationResult<UserInfoDto>> GetUserProfileInfoAsync(Guid userId)
        {
            try
            {
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
