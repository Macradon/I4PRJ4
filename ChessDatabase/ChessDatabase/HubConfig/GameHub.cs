using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessDatabase.Models;
using ChessDatabase.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChessDatabase.HubConfig
{
    public class GameHub : Hub
    {
        private string[] _playerArray = new string[2];
        private int _gameNumber = 0;

        public async Task findOpenGameRoom(string ConnectionId)
        {
            if (_gameNumber > 20) _gameNumber = 0;

            string _gameRoom;

            if (_playerArray[0] != null)
            {
                if (_playerArray[1] != null)
                {
                    Array.Clear(_playerArray, 0, _playerArray.Length);
                    _gameNumber ++;
                    _playerArray[0] = ConnectionId;
                }
                else
                {
                    _playerArray[1] = ConnectionId;
                }
                _playerArray[0] = ConnectionId;
            }
            _gameRoom = _playerArray[0] + _gameNumber.ToString();

            await Clients.Caller.SendAsync("QueuedForGame", _gameRoom);
            await Groups.AddToGroupAsync(ConnectionId, _gameRoom);

            if (_playerArray[1] == ConnectionId)
            {
                ChessColorModel player1 = new ChessColorModel() { color = ChessColorModel.ChessColor.WHITE };
                ChessColorModel player2 = new ChessColorModel() { color = ChessColorModel.ChessColor.BLACK };
                await Clients.User(_playerArray[0]).SendAsync("BeginGame", player1 );
                await Clients.User(_playerArray[1]).SendAsync("BeginGame", player2 );
            }
        }

        public async Task SendMove(string gameRoom, string move)
        {
            await Clients.Group(gameRoom).SendAsync(move);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ConnectedToGameHub", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await base.OnDisconnectedAsync(ex);
        }
    }
}
