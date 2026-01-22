namespace CasinoApi.Dto
{
    public class UserProfileDto
    {
        public UserInfoDto UserInfo { get; set; }
        public List<BetDto> LastTenBets { get; set; }
    }
}
