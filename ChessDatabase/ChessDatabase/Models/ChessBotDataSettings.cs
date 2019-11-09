using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessDatabase.Interfaces;

namespace ChessDatabase.Models
{
    public class ChessBotDataSettings : IChessBosDataSettings
    {
        public string UserCollectionName { get; set; }
        public string RefreshTokenCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
