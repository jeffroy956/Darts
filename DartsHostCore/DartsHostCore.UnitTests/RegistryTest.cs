using DartsHostCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace DartsHostCore.UnitTests
{
    public class RegistryTest
    {
        [Fact]
        public void RegisterNewPlayer()
        {
            Registry registry = new Registry();

            Player player = registry.RegisterPlayer("Player One");
            Assert.NotNull(player);
            Assert.Equal("Player One", player.Name);
        }

        [Fact]
        public void CannotRegisterPlayerWithTheSameNameAsAnotherPlayer()
        {
            Registry registry = new Registry();

            registry.RegisterPlayer("Player One");
            Assert.Throws<DartRoomException>(() => registry.RegisterPlayer("Player One"));
        }

        [Fact]
        public void UnregisterPlayer()
        {
            Registry registry = new Registry();

            Player player = registry.RegisterPlayer("Player Two");

            registry.UnregisterPlayer(player);
            
            Assert.Null(registry.FindPlayer("Player Two"));
        }

        [Fact]
        public void AddRoomToRegistry()
        {
            Registry registry = new Registry();

            registry.CreateRoom("Room 1", new Player("Player One"));

            Assert.Single(registry.Rooms);
            Assert.Equal("Room 1", registry.Rooms[0].RoomName);
        }

        [Fact]
        public void AddingDuplicateRoomToRegistryFails()
        {
            Registry registry = new Registry();

            registry.CreateRoom("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() =>
                registry.CreateRoom("Room 1", new Player("Player Two"))
            );
        }

        [Fact]
        public void PlayerJoinsARoom()
        {
            Registry registry = new Registry();
            registry.CreateRoom("Room 1", new Player("Player One"));

            registry.JoinRoom("Room 1", new Player("Player Two"));

            var room = registry.FindRoom("Room 1");

            Assert.Equal(2, room.Players.Count);
        }

        [Fact]
        public void PlayerTriesToJoinARoomThatDoesNotExist()
        {
            Registry registry = new Registry();
            
            Assert.Throws<DartRoomException>(() => registry.JoinRoom("Room 1", new Player("Player One")));
        }

        [Fact]
        public void CloseRoomRemovesFromList()
        {
            Registry registry = new Registry();
            var player = registry.RegisterPlayer("Player One");

            registry.CreateRoom("Room 1", player);

            registry.CloseRoom("Room 1", player);

            Assert.Empty(registry.Rooms);
        }

        [Fact]
        public void CannotCloseARoomThatYouDoNotOwn()
        {
            Registry registry = new Registry();

            registry.CreateRoom("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() => registry.CloseRoom("Room 1", new Player("Player Two")));
        }

        [Fact]
        public void CannotUnregisterARoomThatDoesNotExist()
        {
            Registry registry = new Registry();

            registry.CreateRoom("Room 1", new Player("Player One"));

            Assert.Throws<DartRoomException>(() => registry.CloseRoom("Room 2", new Player("Player One")));
        }

    }
}
