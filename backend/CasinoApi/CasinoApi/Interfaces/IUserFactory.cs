using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IUserFactory<T>
    {
        User Create(T dto);
    }
}
