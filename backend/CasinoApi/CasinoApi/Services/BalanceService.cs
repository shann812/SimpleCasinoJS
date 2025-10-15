using CasinoApi.Data;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Services
{
    public class BalanceService
    {
        private readonly ApplicationDbContext _db;
        public BalanceService(ApplicationDbContext db) 
        { 
            _db = db;
        }
    }
}
