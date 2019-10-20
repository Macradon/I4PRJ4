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
        [Route("register")]
        public Task<IActionResult> Register(string username, string password, 
                                            string firstname, string lastname)
        {

        }

        [HttpPost]
        [Route("login")]
        public Task<IActionResult> Login(string username, string password)
        {

            return new ObjectResult();
        }

        
    }
}