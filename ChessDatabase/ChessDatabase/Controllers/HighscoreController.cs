using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChessDatabase.Models;
using ChessDatabase.Services;
using System.Web.Http.Cors;

namespace ChessDatabase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HighscoreController : ControllerBase
    {
        private readonly HighscoreService _highscoreService;
        private readonly UserService _userService;

        public HighscoreController(UserService userService, HighscoreService highscoreService)
        {

            _userService = userService;
            _highscoreService = highscoreService;
        }

        [HttpPost("highscore")]
        public ActionResult CreateHighscore(Highscore highscore)
        {
            Highscore newScore = new Highscore()
            {
                //indsæt data for highscore
            };

            _highscoreService.Create(newScore);

            return Ok(newScore);
        }

        [HttpGet("highscores")]
        public ActionResult highscores()
        {
            var scoreList = new List<Highscore>();
            scoreList = _highscoreService.GetAll();
            return Ok(scoreList);
        }

    }
}
