using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class DartRoom
    {
        public DartRoom(string roomName, Player owner)
        {
            RoomName = roomName;
            Owner = owner;
            Players.Add(owner);
        }

        public string RoomName { get; private set; }

        public Player Owner { get; private set; }
        public List<Player> Players { get; private set; } = new List<Player>();

        public void AddPlayer(Player player)
        {
            if (Players.Any((p) => p.Name == player.Name))
            {
                throw new DartRoomException($"Player with name {player.Name} already joined room");
            }
            Players.Add(player);
        }
    }
}
