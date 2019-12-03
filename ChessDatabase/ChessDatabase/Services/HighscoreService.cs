using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using ChessDatabase.Interfaces;
using ChessDatabase.Models;

namespace ChessDatabase.Services
{
    public class HighscoreService
    {
        private readonly IMongoCollection<Highscore> _scores;

        public HighscoreService(IChessBosDataSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _scores = database.GetCollection<Highscore>(settings.HighscoresCollectionName);
        }

        public List<Highscore> GetAll() =>
            _scores.Find(highscore => true).ToList();

        public Highscore Get(string id) =>
            _scores.Find<Highscore>(highscore => highscore.Id == id).FirstOrDefault();

        public Highscore Create(Highscore highscore)
        {
            _scores.InsertOne(highscore);
            return highscore;
        }
    }
}
