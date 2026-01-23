using CasinoApi.Dto;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class UserProfileService
    {
        private readonly BetService _betService;
        private readonly UserService _userService;

        public UserProfileService(BetService betService, UserService userService)
        {
            _betService = betService;
            _userService = userService;
        }

        public async Task<OperationResult<UserInfoDto>> GetUserProfileInfoAsync(Guid userId)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(userId);
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
