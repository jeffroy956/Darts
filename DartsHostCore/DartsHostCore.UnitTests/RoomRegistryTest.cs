using DartsHostCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace DartsHostCore.UnitTests
{
    public class RoomRegistryTest
    {
        [Fact]
        public void AddRoomToRegistry()
        {
            RoomRegistry registry = new RoomRegistry();

            registry.Register("Room 1", new Player("Player One"));

            Assert.Single(registry.Rooms);
            Assert.Equal("Room 1", registry.Rooms[0].RoomName);
        }

        [Fact]
        public void AddingDuplicateRoomToRegistryFails()
        {
            RoomRegistry registry = new RoomRegistry();

            registry.Register("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() =>
                registry.Register("Room 1", new Player("Player Two"))
            );
        }

        [Fact]
        public void PlayerJoinsARoom()
        {
            RoomRegistry registry = new RoomRegistry();
            registry.Register("Room 1", new Player("Player One"));

            registry.JoinRoom("Room 1", new Player("Player Two"));

            var room = registry.FindRoom("Room 1");

            Assert.Equal(2, room.Players.Count);
        }

        [Fact]
        public void PlayerTriesToJoinARoomThatDoesNotExist()
        {
            RoomRegistry registry = new RoomRegistry();
            
            Assert.Throws<DartRoomException>(() => registry.JoinRoom("Room 1", new Player("Player One")));
        }

        [Fact]
        public void UnregisterRoomRemovesFromList()
        {
            RoomRegistry registry = new RoomRegistry();

            registry.Register("Room 1", new Player("Player One"));

            registry.Unregister("Room 1", new Player("Player One"));

            Assert.Empty(registry.Rooms);
        }

        [Fact]
        public void CannotUnregisterARoomThatYouDoNotOwn()
        {
            RoomRegistry registry = new RoomRegistry();

            registry.Register("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() => registry.Unregister("Room 1", new Player("Player Two")));
        }

        [Fact]
        public void CannotUnregisterARoomThatDoesNotExist()
        {
            RoomRegistry registry = new RoomRegistry();

            registry.Register("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() => registry.Unregister("Room 2", new Player("Player One")));
        }

    }
}
