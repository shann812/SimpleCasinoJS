using CasinoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CasinoApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Bet> Bets { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasDefaultValueSql("gen_random_uuid()");
        }
    }
}
