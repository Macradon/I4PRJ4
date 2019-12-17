using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChessDatabase.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Username { get; set; }
        public string password { get; set; }

        public string firstName { get; set; }
        public string lastName { get; set; }
        public int gamesPlayed { get; set; }
        public int bestTime { get; set; }
        public int gamesWon { get; set; }
        public int avgMovesNumber { get; set; }
        public JsonWebToken token { get; set; }
    }
}
