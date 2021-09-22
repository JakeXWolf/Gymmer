using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gymmer.Models
{
    public class UserExercise
    {
        public int Id { get; set; }
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public int EquipmentId { get; set; }
        public int? GripId { get; set; }
        public double Order { get; set; }
        public bool IsPyramid { get; set; }
        public List<Set> Sets { get; set; }

        public UserExercise() {
            Sets = new List<Set>();
        }
    }
}
