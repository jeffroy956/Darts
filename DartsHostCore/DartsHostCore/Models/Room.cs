using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class Room
    {
        public Room(string roomName, Player owner)
        {
            RoomName = roomName;
            Owner = owner;
            Players.Add(owner);
        }

        public string RoomName { get; private set; }

        public Player Owner { get; private set; }
        public List<Player> Players { get; private set; } = new List<Player>();
        public bool GameStarted { get; private set; }

        public void Join(Player player)
        {
            if (GameStarted)
            {
                throw new DartRoomException("Game already started, not allowed to join room.");
            }
            if (Players.Any((p) => p.Name == player.Name))
            {
                throw new DartRoomException($"Player with name {player.Name} already joined room.");
            }
            Players.Add(player);
        }

        public void StartGame()
        {
            GameStarted = true;
        }
    }
}
