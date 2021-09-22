using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gymmer.Models
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Area(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public Area() { }
    }
}
