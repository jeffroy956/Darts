using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class DartRoomException: Exception
    {
        public DartRoomException(string message): base(message)
        {

        }
    }
}
