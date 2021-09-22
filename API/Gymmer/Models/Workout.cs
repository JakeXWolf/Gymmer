using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gymmer.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<Area> Areas { get; set; }
        public List<UserExercise> Exercises { get; set; }

        public Workout()
        {
            Areas = new List<Area>();
            Exercises = new List<UserExercise>();
        }
    }
}
