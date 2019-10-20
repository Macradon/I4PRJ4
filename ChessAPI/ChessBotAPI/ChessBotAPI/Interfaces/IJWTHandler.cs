using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessBotAPI.Models;

namespace ChessBotAPI.Interfaces
{
    interface IJWTHandler
    {
        JsonWebToken CreateToken(string username);
    }
}
