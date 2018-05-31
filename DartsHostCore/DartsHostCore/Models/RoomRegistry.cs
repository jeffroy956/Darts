using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class RoomRegistry
    {
        public void Register(string roomName, Player player)
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

        public void Unregister(string roomName, Player player)
        {
            var room = FindRoom(roomName);
            if (room == null)
            {
                throw new DartRoomException($"Cannot unregister room {roomName}.");
            }
            if (room.Owner.Name == player.Name)
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
