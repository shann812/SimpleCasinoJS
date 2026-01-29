using CasinoApi.Interfaces;

namespace CasinoApi.Data
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        public EFUnitOfWork(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task SaveChangesAsync()
            => await _db.SaveChangesAsync();
    }
}
