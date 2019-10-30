using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ChessDatabase.Models;

namespace ChessDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        [HttpPost("LogIn")]
        public ActionResult Login(string username, string password)
        {

            return Ok("Hello there");
        }

        [HttpPost("token")]
        public ActionResult GetToken(string username, string password)
        {
            if (IsValidCombination(username, password))
                return new ObjectResult(GenerateToken(username));
            return BadRequest();
        }

        private bool IsValidCombination(string username, string password)
        {
            return !(string.IsNullOrEmpty(username) && (username == password));
        }

        private string GenerateToken(string username)
        {
            //security key
            string securityKey = "one_security_key_to_validate_them_all_project_2019$chess";

            //symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            //signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, username));

            //create token
            var token = new JwtSecurityToken(
                issuer: "chess",
                audience: "player",
                claims: claims,
                expires: DateTime.Now.AddHours(30),
                signingCredentials: signingCredentials
                );

            //return token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create()) {
                rng.GetBytes(randomNumber);

                return Convert.ToBase64String(randomNumber);
            }
        }

        [HttpPost("refresh")]
        public ActionResult RefreshToken()
        {
            return Ok("Hello there");
        }
    }
}