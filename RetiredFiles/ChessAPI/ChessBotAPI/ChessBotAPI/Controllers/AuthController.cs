using Microsoft.AspNetCore.Mvc;
using ChessBotAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using ChessBotAPI.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Collections.Generic;
using System;

namespace ChessBotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("account")]
        public IActionResult Get([FromBody] Register request)
            => Content($"Hello {User.Identity.Name}");

        [HttpPost("sign-in")]
        [AllowAnonymous]
        public IActionResult SignIn([FromBody] SignIn request)
            => Ok(_userService.LogIn(request.Username, request.Password));

        [HttpPost("can-i-haz-token")]
        [AllowAnonymous]
        public IActionResult GetToken()
        {
            //security key
            string securityKey = "one_security_key_to_validate_them_all_project_2019$smesk.in";

            //symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            //signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            //add claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "User"));

            //create token
            var token = new JwtSecurityToken(
                issuer: "smesk.in",
                audience: "readers",
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials: signingCredentials,
                claims: claims
            );

            //return token
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }

        [HttpPost("tokens/{token}/refresh")]
        [AllowAnonymous]
        public IActionResult RefreshAccessToken(string token)
            => Ok(_userService.RefreshAccessToken(token));

        [HttpPost("tokens/{token}/revoke")]
        public IActionResult RevokeRefreshToken(string token)
        {
            _userService.RevokeRefreshToken(token);

            return NoContent();
        }
    }
}