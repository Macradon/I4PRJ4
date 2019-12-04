using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessDatabase.Models
{
    public class JsonWebToken
    {
        public string token { get; set; }
        public RefreshToken refreshToken { get; set; }
    }
}
