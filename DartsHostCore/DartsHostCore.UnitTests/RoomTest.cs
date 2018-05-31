using DartsHostCore.Models;
using System;
using Xunit;

namespace DartsHostCore.UnitTests
{
    public class RoomTest
    {
        [Fact]
        public void CreateNewRoom()
        {
            Room room = new Room("one", new Player("Jeff"));
            Assert.Equal("one", room.RoomName);
            Assert.NotNull(room.Owner);
            Assert.Single(room.Players);
        }

        [Fact]
        public void AddPlayerToRoom()
        {
            Room room = new Room("Test Room", new Player("One"));
            room.Join(new Player("Two"));
            Assert.Equal(2, room.Players.Count);
        }

        [Fact]
        public void DoNotAllowDuplicatePlayerNameInRoom()
        {
            Room room = new Room("Test Room", new Player("One"));
            Assert.Throws<DartRoomException>(() => room.Join(new Player("One")));
        }

        [Fact]
        public void StartGameInDartRoom()
        {
            Room room = new Room("Test Room", new Player("One"));

            room.StartGame();

            Assert.True(room.GameStarted);
        }

        [Fact]
        public void DoNotAllowPlayerToJoinWhenGameIsStarted()
        {
            Room room = new Room("Test Room", new Player("One"));

            room.StartGame();

            Assert.Throws<DartRoomException>(() => room.Join(new Player("Two")));
        }
    }
}
