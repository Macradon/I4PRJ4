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
using ChessDatabase.Services;

namespace ChessDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly UserService _userService;

        public AuthController(TokenService tokenService, UserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("register")]
        public ActionResult Register(string username, string password, string firstName, string lastName)
        {
            User newUserRegistration = new User();
            newUserRegistration.firstName = firstName;
            newUserRegistration.lastName = lastName;
            newUserRegistration.Username = username;
            newUserRegistration.password = password;

            return Ok("General Kenobi!");
        }

        [HttpPost("LogIn")]
        public ActionResult Login(string username, string password)
        {
            if (IsExistingUsername(username))
            {
                if (IsCorrectPassword(username, password))
                {
                    var token = new JsonWebToken();
                    var rToken = new RefreshToken();
                    token.token = GenerateToken(username);
                    rToken.refreshToken = GenerateRefreshToken();
                    _tokenService.Create(rToken);
                    token.refreshToken = rToken;
                    return Ok(token);
                }
                else { return BadRequest(); }
            }
            else { return BadRequest(); }
        }

        private bool IsExistingUsername(string username)
        {
            if (username != _userService.Get(username).Username)
            {
                return false;
            }else if ( username == _userService.Get(username).Username)
            {
                return true;
            }
            else { return false; }
        }

        private bool IsCorrectPassword(string username, string password)
        {
            if (password != _userService.Get(username).password)
            {
                return false;
            }else if ( password == _userService.Get(username).password)
            {
                return true;
            }
            else { return false; }
        }

        //Endpoint til udvikling så man kan få en token hurtigt uden at man skal logge ind
        [HttpPost("token")]
        public ActionResult GetToken(string username, string password)
        {
            if (IsValidCombination(username, password))
            {
                var token = new JsonWebToken();
                var rToken = new RefreshToken();
                token.token = GenerateToken(username);
                rToken.refreshToken = GenerateRefreshToken();
                _tokenService.Create(rToken);
                token.refreshToken = rToken;
                return Ok(token);
            }

                
                //return new ObjectResult(GenerateToken(username));
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
        public ActionResult RefreshToken(User user)
        {

            RefreshToken checkToken = user.token.refreshToken;

            if (IsValidRefreshToken(checkToken))
            {
                JsonWebToken newAccessToken = new JsonWebToken();
                newAccessToken.token = GenerateToken(user.Username);
                user.token = newAccessToken;
                RefreshToken newRefreshToken = new RefreshToken();
                newRefreshToken.refreshToken = GenerateRefreshToken();
                user.token.refreshToken = newRefreshToken;

                return Ok(newAccessToken);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool IsValidRefreshToken(RefreshToken refreshToken)
        {
            if (refreshToken.revoked == true)
            {
                return false;
            }else if (refreshToken != _tokenService.Get(refreshToken.Id))
            {
                return false;
            }else if ( refreshToken == _tokenService.Get(refreshToken.Id))
            {
                return true;
            }
            else { return false; }
        }
    }
}