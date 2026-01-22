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

        public async Task<OperationResult<UserProfileDto>> GetUserProfileAsync(Guid userId)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                {
                    //log
                    return OperationResult<UserProfileDto>.Fail("Cannot find user");
                }

                var userInfo = new UserInfoDto
                {
                    Username = user.Username,
                    Email = user.Email,
                    Balance = user.Balance,
                    RegistrationDate = user.RegistrationDate
                };

                var lastTenBets = await _betService.GetUserBetsAsync(userId, 0, 10);
                if (!lastTenBets.Success)
                {
                    //log
                    return OperationResult<UserProfileDto>.Fail(lastTenBets.Errors);
                }

                return OperationResult<UserProfileDto>.Ok(new UserProfileDto
                {
                    UserInfo = userInfo,
                    LastTenBets = lastTenBets.Data
                });
            }

            catch (Exception ex)
            {
                //log
                return OperationResult<UserProfileDto>.Fail("Server error. Exception: " + ex);
            }
        }
    }
}
