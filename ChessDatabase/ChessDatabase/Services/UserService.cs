using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using ChessDatabase.Interfaces;
using ChessDatabase.Models;

namespace ChessDatabase.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IChessBosDataSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public List<User> GetAll() =>
            _users.Find(user => true).ToList();

        public User Get(string username) =>
            _users.Find<User>(user => user.Username == username).FirstOrDefault();

        public User Create (User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string username, User userIn) =>
            _users.ReplaceOne(user => user.Username == username, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Username == userIn.Username);

        public void Remove(string username) =>
            _users.DeleteOne(user => user.Username == username);
    }
}
