using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DartsHostCore.Models
{
    public class Player
    {
        public Player(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
