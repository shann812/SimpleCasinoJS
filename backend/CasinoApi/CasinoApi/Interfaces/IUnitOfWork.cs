namespace CasinoApi.Interfaces
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
    }
}
