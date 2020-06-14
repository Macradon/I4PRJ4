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
        private static string[] _playerArray = new string[2];
        private int _gameNumber = 0;

        public async Task findOpenGameRoom(string ConnectionId)
        {
            if (_gameNumber > 20) _gameNumber = 0;

            string _gameRoom;

            if (_playerArray[0] != null)
            {
                _gameRoom = _playerArray[0] + _gameNumber.ToString();

                await Clients.Caller.SendAsync("QueuedForGame", new ChessColorModel() { color = ChessColorModel.ChessColor.BLACK });
                await Groups.AddToGroupAsync(ConnectionId, _gameRoom);


                await Clients.Group(_gameRoom).SendAsync("BeginGame", _gameRoom);
                Array.Clear(_playerArray, 0, _playerArray.Length);
                _gameNumber++;
            } else
            {
                _playerArray[0] = ConnectionId;
                _gameRoom = _playerArray[0] + _gameNumber.ToString();
                await Clients.Caller.SendAsync("QueuedForGame", new ChessColorModel() { color = ChessColorModel.ChessColor.WHITE });
                await Groups.AddToGroupAsync(ConnectionId, _gameRoom);
            }
        }

        public async Task SendMove(string gameRoom, string move)
        {
            await Clients.Group(gameRoom).SendAsync("Move", move);
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
