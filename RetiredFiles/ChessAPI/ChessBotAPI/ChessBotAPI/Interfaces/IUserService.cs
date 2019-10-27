using ChessBotAPI.Models;

namespace ChessBotAPI.Interfaces
{
    public interface IUserService
    {
        void Register(string username, string password, string firstName, string lastName);
        JsonWebToken LogIn(string username, string password);
        JsonWebToken RefreshAccessToken(string token);
        void RevokeRefreshToken(string token);
    }
}
