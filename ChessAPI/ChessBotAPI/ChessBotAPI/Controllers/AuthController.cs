using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ChessBotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("token")]
        public ActionResult GetToken(int value)
        {
            //security key
            string securityKey = "one_security_key_to_validate_them_all_project_2019$smesk.in";

            //symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            //signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            //add claims
            var claims = new List<Claim>();

            switch (value)
            {
                case 1:
                    claims.Add(new Claim(ClaimTypes.Role, "User"));
                    break;
                case 2:
                    claims.Add(new Claim(ClaimTypes.Role, "Adminstrator"));
                    break;
                default:
                    claims.Add(new Claim(ClaimTypes.Role, "User"));
                    break;
            }

            //create token
            var token = new JwtSecurityToken(
                issuer: "smesk.in",
                audience: "readers",
                expires: DateTime.Now.AddHours(1),
                signingCredentials: signingCredentials,
                claims: claims
            );

            //return token
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }




        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            //security key
            string securityKey = "one_security_key_to_validate_them_all_project_2019$smesk.in";

            //symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));


            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = symmetricSecurityKey,
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        [HttpPost]
        [Route("token/refresh")]
        public IActionResult Refresh(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiredToken(token);
            var username = principal.Identity.Name;
            var savedRefreshToken = GetRefreshToken(username); //retrieve the refresh token from a data store
            if (savedRefreshToken != refreshToken)
                throw new SecurityTokenException("Invalid refresh token");

            var newJwtToken = GenerateToken(principal.Claims);
            var newRefreshToken = GenerateRefreshToken();
            DeleteRefreshToken(username, refreshToken);
            SaveRefreshToken(username, newRefreshToken);

            return new ObjectResult(new
            {
                token = newJwtToken,
                refreshToken = newRefreshToken
            });
        }
    }
}