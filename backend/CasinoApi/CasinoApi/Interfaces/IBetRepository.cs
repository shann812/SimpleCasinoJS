using CasinoApi.Dto;
using CasinoApi.Models;

namespace CasinoApi.Interfaces
{
    public interface IBetRepository
    {
        void Add(Bet bet);
        Task<List<BetDto>> GetUserBets(Guid userId, int skip, int take);
    }
}
