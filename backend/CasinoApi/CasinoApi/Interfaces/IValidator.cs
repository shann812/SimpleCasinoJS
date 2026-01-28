using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IValidator<T>
    {
        Task<OperationResult> ValidateAsync(T dto);
    }
}