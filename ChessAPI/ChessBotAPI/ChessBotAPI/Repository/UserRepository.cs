using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessBotAPI.Interfaces;
using ChessBotAPI.Models;

namespace ChessBotAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        public UserRepository()
        {

        }

        public UserLogin Authenticate(string username, string password)
        {

        }

        public Task<List<UserLogin>> GetAllUsers()
        {

        }

        public Task<int> AddUser(UserLogin user)
        {

        }
    }
}
