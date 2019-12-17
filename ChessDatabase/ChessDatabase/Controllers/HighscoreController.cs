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
    public class HighscoresController : ControllerBase
    {
        private readonly HighscoreService _highscoreService;
        private readonly UserService _userService;

        public HighscoresController(UserService userService, HighscoreService highscoreService)
        {

            _userService = userService;
            _highscoreService = highscoreService;
        }

        [HttpPost("create")]
        public ActionResult CreateHighscore(Highscore highscore)
        {
            Highscore newScore = new Highscore()
            {
                username = highscore.username,
                firstName = highscore.firstName,
                lastName = highscore.lastName,
                time = highscore.time,
                won = highscore.won,
                numberOfMoves = highscore.numberOfMoves
            };

            User user = _userService.Get(highscore.username);
            
            user.gamesPlayed++;
            if(highscore.won)
            { 
                user.gamesWon++;
                if (highscore.time < user.bestTime || user.bestTime == 0) user.bestTime = highscore.time;
                if (highscore.numberOfMoves < user.avgMovesNumber || user.avgMovesNumber == 0) user.avgMovesNumber = highscore.numberOfMoves;
                _userService.Update(user.Username, user);
                _highscoreService.Create(newScore);
            }
           return Ok(newScore);
        }

        [HttpGet("")]
        public ActionResult highscores()
        {
            var highscoreList = new List<Highscore>();
            highscoreList = _highscoreService.GetAll();
            var scoreList = highscoreList.OrderBy(n => n.numberOfMoves).ToArray().Take<Highscore>(5);
            return Ok(scoreList);
        }

    }
}
