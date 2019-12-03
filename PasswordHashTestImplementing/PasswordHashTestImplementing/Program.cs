using System;
using Microsoft.AspNetCore.Identity;

namespace PasswordHashTestImplementing
{
    class Program
    {
        static void Main(string[] args)
        {
            // Setup
            var _passHash = new PasswordHasher<User>();

            string firstPassword = "Passw0rd";
            string secondPassword = "AlsoPassw0rd";
            string thirdPassword = "IGuessPassw0rd";


            // Creating users
            User user1 = new User("Rick", "pickle", firstPassword);
            string user1OldPassword = user1.password;
            Console.WriteLine("Your current password for user1: " + firstPassword);
            user1.password = _passHash.HashPassword(user1, firstPassword);
            Console.WriteLine("Your hashed password: " + user1.password);

            User user2 = new User("Morty", "evilMarty", secondPassword);
            string user2OldPassword = user2.password;
            Console.WriteLine("Your current password for user2: " + secondPassword);
            user2.password = _passHash.HashPassword(user2, secondPassword);
            Console.WriteLine("Your hashed password: " + user2.password);

            User user3 = new User("Summer", "winter", thirdPassword);
            string user3OldPassword = user3.password;
            Console.WriteLine("Your current password for user3: " + thirdPassword);
            user3.password = _passHash.HashPassword(user3, thirdPassword);
            Console.WriteLine("Your hashed password: " + user3.password);


            // Testing
            Console.WriteLine("Let's see if this shit works");

            Console.WriteLine("The old Password for user1: " + user1OldPassword);
            Console.WriteLine("The hashed password for user1: " + user1.password);
            PasswordVerificationResult Verification1 = _passHash.VerifyHashedPassword(user1, user1.password, user1OldPassword);
            Console.WriteLine(Verification1);

            Console.WriteLine("The old Password for user2: " + user2OldPassword);
            Console.WriteLine("The hashed password for user2: " + user2.password);
            PasswordVerificationResult Verification2 = _passHash.VerifyHashedPassword(user2, user2.password, user2OldPassword);
            Console.WriteLine(Verification2);

            Console.WriteLine("The old Password for user3: " + user3OldPassword);
            Console.WriteLine("The hashed password for user3: " + user3.password);
            PasswordVerificationResult Verification3 = _passHash.VerifyHashedPassword(user3, user3.password, user3OldPassword);
            Console.WriteLine(Verification3);

            // Testing for failure
            Console.WriteLine("Can it fail?");
            PasswordVerificationResult testFail = _passHash.VerifyHashedPassword(user3, user3.password, user2OldPassword);
            Console.WriteLine(testFail);
        }
    }
}
