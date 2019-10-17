using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessBotAPI.Models;

namespace ChessBotAPI.Interfaces
{
    public interface IUserRepository
    {
        UserLogin Authenticate(string username, string password);
        Task<List<UserLogin>> GetAllUsers();
        Task<int> AddUser(UserLogin user);
    }
}
