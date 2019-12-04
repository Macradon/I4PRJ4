using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using ChessDatabase.Interfaces;
using ChessDatabase.Models;

namespace ChessDatabase.Services
{
    public class TokenService
    {
        private readonly IMongoCollection<RefreshToken> _refreshTokens;

        public TokenService(IChessBosDataSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _refreshTokens = database.GetCollection<RefreshToken>(settings.RefreshTokensCollectionName);
        }

        public List<RefreshToken> Get() =>
            _refreshTokens.Find(refreshToken => true).ToList();

        public RefreshToken Get(string id) =>
            _refreshTokens.Find<RefreshToken>(refreshToken => refreshToken.Id == id).FirstOrDefault();

        public RefreshToken Create(RefreshToken refreshToken)
        {
            _refreshTokens.InsertOne(refreshToken);
            return refreshToken;
        }

        public void Update(string id, RefreshToken tokenIn) =>
            _refreshTokens.ReplaceOne(refreshToken => refreshToken.Id == id, tokenIn);

        public void Remove(RefreshToken tokenIn)
        {
            var revokeToken = tokenIn;
            revokeToken.revoked = true;
        }

        public void Delete(string token)
        {
            _refreshTokens.DeleteOne(x=> x.refreshToken == token);
        }
    }
}
