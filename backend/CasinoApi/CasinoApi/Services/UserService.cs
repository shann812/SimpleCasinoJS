using CasinoApi.Dto;
using CasinoApi.Interfaces;
using CasinoApi.Models;

namespace CasinoApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IValidator<RegistrationUserDto> _registrationValidator;
        private readonly IUserFactory<RegistrationUserDto> _registrationUserFactory;
        private readonly IUnitOfWork _uow;

        public UserService(IUserRepository userRepository, 
            IValidator<RegistrationUserDto> registrationValidator, 
            IUserFactory<RegistrationUserDto> registrationUserFactory,
            IUnitOfWork uow)
        {
            _userRepository = userRepository;
            _registrationValidator = registrationValidator;
            _registrationUserFactory = registrationUserFactory;
            _uow = uow;
        }

        public async Task<OperationResult> RegisterAsync(RegistrationUserDto dto)
        {
            try
            {
                var validationResult = await _registrationValidator.ValidateAsync(dto);
                if (!validationResult.Success)
                    return validationResult;

                var user = _registrationUserFactory.Create(dto);
                _userRepository.Add(user);
                await _uow.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return OperationResult.Fail("An error occurred while saving the user.");
                // Log the exception (ex) if needed
            }

            return new OperationResult(); //Success = true by default
        }

        public async Task<User?> GetByEmailAsync(string email) 
            => await _userRepository.GetByEmailAsync(email);

        public async Task<User?> GetByIdAsync(Guid userId) 
            => await _userRepository.GetByIdAsync(userId);
    }
}
