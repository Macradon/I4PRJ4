using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChessDatabase.Models
{
    public class Highscore
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string username { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int time { get; set; }
        public bool won { get; set; }
        public int numberOfMoves { get; set; }
    }
}
