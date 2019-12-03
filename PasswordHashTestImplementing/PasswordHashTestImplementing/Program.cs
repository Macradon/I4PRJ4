using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace PasswordHashTestImplementing
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter password: ");
            string password =  Console.ReadLine();

            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            Console.WriteLine($"Hashed: {hashed}");


            Console.WriteLine("Do it again: ");
            string password2 = Console.ReadLine();

            byte[] salt2 = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            Console.WriteLine($"Salt2: {Convert.ToBase64String(salt2)}");

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed2 = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password2,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            Console.WriteLine($"Hashed2: {hashed2}");
        }
    }
}
