﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessDatabase.Interfaces;

namespace ChessDatabase.Models
{
    public class ChessBotDataSettings : IChessBosDataSettings
    {
        public string UsersCollectionName { get; set; }
        public string RefreshTokensCollectionName { get; set; }
        public string HighscoresCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
