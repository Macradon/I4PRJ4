using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessDatabase.Interfaces
{
    public interface IChessBosDataSettings
    {
        string UserCollectionName { get; set; }
        string RefreshTokenCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
