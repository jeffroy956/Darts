using Microsoft.AspNetCore.SignalR;

using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class DartRoomHub : Hub
    {
        private static Registry registry = new Registry();
        public async Task SendMessage(string user, string message)
        {

            await Clients.All.SendAsync("ReceiveMessage", user,message);
        }

        public async Task StartRoom(string user, string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Groups(roomName).SendAsync("ReceiveMessage", user, $"started room {roomName}");
        }

        public async Task Register(string userName)
        {
            try
            {
                Player player = registry.RegisterPlayer(userName);

                await Clients.Caller.SendAsync("Register", player);
            }
            catch (DartRoomException ex)
            {
                await Clients.Caller.SendAsync("Failure", ex.Message);
            }

        }
    }
}