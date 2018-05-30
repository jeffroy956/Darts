using Microsoft.AspNetCore.SignalR;

using System.Threading.Tasks;

namespace DartsHostCore
{
    public class DartRoomHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", user,message);
        }

        public async Task StartRoom(string user, string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Groups(roomName).SendAsync("ReceiveMessage", user, $"started room {roomName}");
        }
    }
}