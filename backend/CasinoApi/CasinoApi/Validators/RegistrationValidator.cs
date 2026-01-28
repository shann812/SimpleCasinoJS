using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Validators
{
    public class RegistrationValidator : IValidator<RegistrationUserDto>
    {
        private readonly IUserRepository _userRepository;
        public RegistrationValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<OperationResult> ValidateAsync(RegistrationUserDto dto)
        {
            var result = new OperationResult();

            if (string.IsNullOrWhiteSpace(dto.Username) || dto.Username.Length < 4 || dto.Username.Length > 20)
                result.Errors.Add("Username must be 4-20 characters long.");

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                result.Errors.Add("Password must be at least 6 characters long.");

            var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingUser != null)
                result.Errors.Add("This email is already taken.");

            if (dto.Password != dto.PasswordRepeat)
                result.Errors.Add("Passwords do not match.");

            result.Success = !result.Errors.Any();
            return result;
        }
    }
}
