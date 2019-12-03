using System;
using System.Collections.Generic;
using System.Text;

namespace PasswordHashTestImplementing
{
    public class User
    {
        public User(string newName, string newUsername, string newPassword)
        {
            name = newName;
            username = newUsername;
            password = newPassword;

        }
        public string name { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
