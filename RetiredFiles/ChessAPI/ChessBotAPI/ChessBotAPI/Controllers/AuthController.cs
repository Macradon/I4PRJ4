using Microsoft.AspNetCore.Mvc;
using ChessBotAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using ChessBotAPI.Models;

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