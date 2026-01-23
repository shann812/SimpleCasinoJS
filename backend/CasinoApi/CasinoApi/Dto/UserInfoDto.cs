namespace CasinoApi.Dto
{
    public class UserInfoDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public decimal Balance { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
