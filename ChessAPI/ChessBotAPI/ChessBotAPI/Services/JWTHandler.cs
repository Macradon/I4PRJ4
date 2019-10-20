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
using ChessBotAPI.Interfaces;
using ChessBotAPI.Models;
using Microsoft.Extensions.Options;

namespace ChessBotAPI.Services
{
    public class JWTHandler : IJWTHandler
    {
        private JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private SecurityKey _securityKey;
        private SigningCredentials _signingCredentials;
        private JwtHeader _jwtHeader;

        public JWTHandler()
        {
            _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                                    "one_security_key_to_validate_them_all_project_2019$smesk.in"));
            _signingCredentials = new SigningCredentials(_securityKey, 
                                    SecurityAlgorithms.HmacSha256Signature);
            _jwtHeader = new JwtHeader(_signingCredentials);
        }

        public JsonWebToken CreateToken(string username)
        {
            var expires = DateTime.Now.AddMinutes(10);
            var centuryBegin = new DateTime(1970, 1, 1);
            var expiration = (long)(new TimeSpan(expires.Ticks - centuryBegin.Ticks).TotalSeconds);
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "User"));

            var payload = new JwtPayload
            {
                {"sub", username },                     //Subject
                {"iss", "smesk.in" },                   //Issuer
                {"exp", expiration },                   //Expiration time
                {"aud", "players"},                     //Audience
                {"claims", claims },                    //Claims
                {"unique_name", username },
            };

            var jwt = new JwtSecurityToken(_jwtHeader, payload);
            var token = _jwtSecurityTokenHandler.WriteToken(jwt);

            return new JsonWebToken
            {
                AccessToken = token,
                Expires = expiration
            };
        }
    }
}