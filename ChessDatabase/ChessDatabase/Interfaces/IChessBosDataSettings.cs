using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessDatabase.Interfaces
{
    public interface IChessBosDataSettings
    {
        string UsersCollectionName { get; set; }
        string HighscoresCollectionName { get; set; }
        string RefreshTokensCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
