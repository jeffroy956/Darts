using DartsHostCore.Models;
using System;
using Xunit;

namespace DartsHostCore.UnitTests
{
    public class DartRoomTest
    {
        [Fact]
        public void CreateNewRoom()
        {
            DartRoom room = new DartRoom("one", new Player("Jeff"));
            Assert.Equal("one", room.RoomName);
            Assert.NotNull(room.Owner);
            Assert.Single(room.Players);
        }

        [Fact]
        public void AddPlayerToRoom()
        {
            DartRoom room = new DartRoom("Test Room", new Player("One"));
            room.AddPlayer(new Player("Two"));
            Assert.Equal(2, room.Players.Count);
        }

        [Fact]
        public void DoNotAllowDuplicatePlayerNameInRoom()
        {
            DartRoom room = new DartRoom("Test Room", new Player("One"));
            Assert.Throws<DartRoomException>(() => room.AddPlayer(new Player("One")));
        }
    }
}
