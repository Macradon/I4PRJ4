using ChessBotAPI.Models;

namespace ChessBotAPI.Interfaces
{
    interface IJWTHandler
    {
        JsonWebToken CreateToken(string username);
    }
}
