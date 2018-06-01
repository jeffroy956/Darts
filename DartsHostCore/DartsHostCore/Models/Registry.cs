using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class Registry
    {
        public void CreateRoom(string roomName, Player player)
        {
            var existingRoom = FindRoom(roomName);
            if (existingRoom == null)
            {
                Rooms.Add(new Room(roomName, player));
            }
            else
            {
                throw new DartRoomException($"Room name {roomName} is already in use.");
            }
        }

        public Player RegisterPlayer(string name)
        {
            var player = FindPlayer(name);
            if (player == null)
            {
                player = new Player(name);
                players.Add(player);

                return player;
            }

            throw new DartRoomException($"Player name {name} is already in use.");
        }
        public void UnregisterPlayer(Player player)
        {
            players.Remove(player);
        }

        public Player FindPlayer(string name)
        {
            return players.Find((player) => player.Name == name);
        }


        private List<Player> players = new List<Player>();

        public Room FindRoom(string roomName)
        {
            return Rooms.Find((room) => room.RoomName == roomName);
        }

        public List<Room> Rooms { get; private set; } = new List<Room>();

        public void JoinRoom(string roomName, Player player)
        {
            var room = FindRoom(roomName);
            if (room == null)
            {
                throw new DartRoomException($"Room name {roomName} does not exist.");
            }
            FindRoom(roomName).Join(player);
        }

        public void CloseRoom(string roomName, Player player)
        {
            var room = FindRoom(roomName);
            if (room == null)
            {
                throw new DartRoomException($"Cannot unregister room {roomName}.");
            }
            if (ReferenceEquals(room.Owner, player))
            {
                Rooms.Remove(FindRoom(roomName));
            }
            else
            {
                throw new DartRoomException($"Cannot unregister room {roomName}.");
            }
        }
    }
}
