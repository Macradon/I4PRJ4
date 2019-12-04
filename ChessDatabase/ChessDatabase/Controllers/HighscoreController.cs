﻿using System;
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
            if (highscore.won) user.gamesWon++;
            //user.bestTime skal laves om til en int
            //if (highscore.time < user.bestTime) user.bestTime = highscore.time;
            if (user.avgMovesNumber == 0) user.avgMovesNumber = highscore.numberOfMoves;
            else  user.avgMovesNumber = (highscore.numberOfMoves + user.avgMovesNumber) / 2;
            _userService.Update(user.Username, user);
            _highscoreService.Create(newScore);

            return Ok(newScore);
        }

        [HttpGet("")]
        public ActionResult highscores()
        {
            var scoreList = new List<Highscore>();
            scoreList = _highscoreService.GetAll();
            return Ok(scoreList);
        }

    }
}
