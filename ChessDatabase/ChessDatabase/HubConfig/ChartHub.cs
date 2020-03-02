using ChessDatabase.Models;
using ChessDatabase.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessDatabase.HubConfig
{
    public class ChartHub : Hub    
    { 
        private readonly HighscoreService _highscoreService;
        private readonly UserService _userService;

        public ChartHub(UserService userService, HighscoreService highscoreService)
        {

            _userService = userService;
            _highscoreService = highscoreService;
        }

        public async Task BroadcastHighscore(Highscore highscore)
        {
            await Clients.All.SendAsync("broadcasthighscore", highscore);
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
            if (highscore.won)
            {
                user.gamesWon++;
                if (highscore.time < user.bestTime || user.bestTime == 0) user.bestTime = highscore.time;
                if (highscore.numberOfMoves < user.avgMovesNumber || user.avgMovesNumber == 0) user.avgMovesNumber = highscore.numberOfMoves;
                _userService.Update(user.Username, user);
                _highscoreService.Create(newScore);
            }
            var highscoreList = new List<Highscore>();
            highscoreList = _highscoreService.GetAll();
            var scoreList = highscoreList.OrderBy(n => n.numberOfMoves).ToArray().Take<Highscore>(5);
            await Clients.All.SendAsync("transferhighscores", scoreList);
            Console.WriteLine(scoreList);
        }
    
    }
}
