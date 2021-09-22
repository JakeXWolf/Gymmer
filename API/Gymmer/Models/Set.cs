using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gymmer.Models
{
    public class Set
    {
        public int Id { get; set; }
        public int Reps { get; set; }
        public int Weight { get; set; }
        public int? Time { get; set; }

        public Set()
        {
            Id = 0;
            Reps = 12;
            Weight = 0;
            Time = 0;
        }
    }
}
