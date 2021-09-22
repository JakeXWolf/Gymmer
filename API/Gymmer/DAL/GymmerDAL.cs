using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SQLite;
using System.IO;
using Gymmer.Models;

namespace Gymmer.DAL
{
    public class GymmerDAL
    {
        public static string _gymmerConnStr = "Data Source=gymmer.sqlite3";

        public static void CreateDb()
        {
            if (!File.Exists("./gymmerDb.sqlite3"))
            {
                SQLiteConnection.CreateFile("gymmer.sqlite3");
                System.Console.WriteLine("Created DB");
            }
        }

        //FOR REFERENCE
        static void InsertData(SQLiteConnection conn)
        {
            SQLiteCommand sqlite_cmd;
            sqlite_cmd = conn.CreateCommand();
            sqlite_cmd.CommandText = "INSERT INTO mapAreaToExerciseOption(areaId, exerciseId) VALUES(1, 2);";
            //sqlite_cmd.CommandText = "INSERT INTO userWorkouts (userId, date, lengthInSecs) VALUES(1, '5/25/2021', 75);";
            sqlite_cmd.ExecuteNonQuery();
        }

        public List<ExerciseOption> GetExerciseOptions(int area)
        {
            List<ExerciseOption> exerciseOptions = new List<ExerciseOption>();

            using (var con = new SQLiteConnection(_gymmerConnStr))
            {
                con.Open();

                string query = "select e.id, e.name from exerciseOptions e join mapAreaToExerciseOption m  on e.id = m.exerciseId where m.areaId = @AreaId";
                using var cmd = new SQLiteCommand(query, con);
                cmd.Parameters.AddWithValue("@AreaId", area);

                using SQLiteDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    exerciseOptions.Add(new ExerciseOption()
                    {
                        Id = rdr.GetInt32(rdr.GetOrdinal("id")),
                        Name = rdr.GetString(rdr.GetOrdinal("name"))
                    });
                }
            }

            return exerciseOptions;
        }

        public List<Area> GetAreas()
        {
            List<Area> areas = new List<Area>();

            using (var con = new SQLiteConnection(_gymmerConnStr))
            {
                con.Open();

                string query = "select e.id, e.name from areas";
                using var cmd = new SQLiteCommand(query, con);

                using SQLiteDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    areas.Add(new Area()
                    {
                        Id = rdr.GetInt32(rdr.GetOrdinal("id")),
                        Name = rdr.GetString(rdr.GetOrdinal("name"))
                    });
                }
            }

            return areas;
        }

        public List<Workout> GetUserWorkoutsByUser(int userId)
        {
            List<Workout> workouts = new List<Workout>();
            using (var con = new SQLiteConnection(_gymmerConnStr))
            {
                con.Open();

                string query = "SELECT e.id, e.name FROM userWorkouts WHERE userId = @userId";
                using var cmd = new SQLiteCommand(query, con);
                cmd.Parameters.AddWithValue("@userId", userId);

                using SQLiteDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    workouts.Add(new Workout()
                    {
                        Id = rdr.GetInt32(rdr.GetOrdinal("id")),
                        Date = DateTime.Parse(rdr.GetString(rdr.GetOrdinal("date")))
                    });
                }
            }

            return workouts;
        }

        //public List<Workout> GetWorkout(int workoutId)
        //{
        //    List<Workout> workout = new List<Workout>();
        //    using (var con = new SQLiteConnection(_gymmerConnStr))
        //    {
        //        con.Open();

        //        string query = "INSERT INTO userExercise(workoutId, exerciseId, equipmentId, grip, order, isPyramid) VALUES(@workoutId, @exerciseId, @equipmentId, @grip, @order, @isPyramid)";
        //        using var cmd = new SQLiteCommand(query, con);

        //        using SQLiteDataReader rdr = cmd.ExecuteReader();

        //        while (rdr.Read())
        //        {
        //            workout.Id = rdr.GetInt32(0);
        //            workout.Date = DateTime.Parse(rdr.GetString(1));
        //        }
        //    }

        //    return workout;
        //}

        public List<UserExercise> GetUserExercises(int workoutId)
        {
            List<UserExercise> userExercises = new List<UserExercise>();
            using (var con = new SQLiteConnection(_gymmerConnStr))
            {
                con.Open();

                string query = "SELECT e.id, e.workoutId, e.exerciseId, e.equipmentId, e.gripId, e.[order], e.isPyramid, s.id as setId, s.reps, s.weight, s.time FROM userExercise e JOIN userSets s ON e.Id = s.userExerciseId WHERE e.workoutId = @WorkoutId";
                using var cmd = new SQLiteCommand(query, con);
                cmd.Parameters.AddWithValue("@WorkoutId", workoutId);

                using SQLiteDataReader rdr = cmd.ExecuteReader();
                UserExercise exercise = new UserExercise();

                while (rdr.Read())
                {
                    int exerciseId = rdr.GetInt32(rdr.GetOrdinal("id"));

                    // if first or next exercise in workout, add previous and record next userExercise
                    if (exercise.Id != exerciseId)
                    {
                        if (exercise.Id != 0)
                        {
                            userExercises.Add(exercise);
                        }

                        exercise = new UserExercise();

                        exercise.Id = exerciseId;
                        exercise.WorkoutId = rdr.GetInt32(rdr.GetOrdinal("workoutId"));
                        exercise.ExerciseId = rdr.GetInt32(rdr.GetOrdinal("exerciseId"));
                        exercise.EquipmentId = rdr.GetInt32(rdr.GetOrdinal("equipmentId"));
                        exercise.GripId = (rdr[rdr.GetOrdinal("gripId")] as int?).GetValueOrDefault();
                        exercise.Order = rdr.GetDouble(rdr.GetOrdinal("order"));
                        exercise.IsPyramid = rdr.GetBoolean(rdr.GetOrdinal("isPyramid"));
                    }

                    var set = new Set();
                    set.Id = rdr.GetInt32(rdr.GetOrdinal("setId"));
                    set.Reps = rdr.GetInt32(rdr.GetOrdinal("reps"));
                    set.Weight = rdr.GetInt32(rdr.GetOrdinal("weight"));
                    set.Time = (rdr[rdr.GetOrdinal("time")] as int?).GetValueOrDefault();

                    exercise.Sets.Add(set);
                }
                userExercises.Add(exercise);
            }

            return userExercises;
        }

        public void InsertUserWorkout(Workout workout)
        {
            using (var con = new SQLiteConnection(_gymmerConnStr))
            {
                con.Open();

                using var cmd = new SQLiteCommand(con);

                //TODO: insert actual workout too
                workout.Exercises.ForEach(e =>
                {
                    InsertExercise(e, cmd);
                });
                workout.Areas.ForEach(a =>
                {
                    cmd.CommandText = "INSERT INTO userExercise(userWorkoutId, areaId) VALUES(@userWorkoutId, @areaId)";

                    cmd.Parameters.AddWithValue("@userWorkoutId", workout.Id);
                    cmd.Parameters.AddWithValue("@areaId", a.Id);
                });
            }
        }

        public void InsertExercise(UserExercise exercise, SQLiteCommand cmd)
        {
            cmd.CommandText = "INSERT INTO userExercise(workoutId, exerciseId, equipmentId, grip, order, isPyramid) VALUES(@workoutId, @exerciseId, @equipmentId, @gripId, @order, @isPyramid)";

            cmd.Parameters.AddWithValue("@workoutId", exercise.WorkoutId);
            cmd.Parameters.AddWithValue("@exerciseId", exercise.ExerciseId);
            cmd.Parameters.AddWithValue("@equipmentId", exercise.EquipmentId);
            cmd.Parameters.AddWithValue("@gripId", exercise.GripId);
            cmd.Parameters.AddWithValue("@order", exercise.Order);
            cmd.Parameters.AddWithValue("@isPyramid", exercise.IsPyramid);

            cmd.ExecuteNonQuery();
        } 

        // Reference
        static void ReadData(SQLiteConnection conn)
        {
            SQLiteDataReader sqlite_datareader;
            SQLiteCommand sqlite_cmd;
            sqlite_cmd = conn.CreateCommand();
            sqlite_cmd.CommandText = "SELECT * FROM SampleTable";

            sqlite_datareader = sqlite_cmd.ExecuteReader();
            while (sqlite_datareader.Read())
            {
                string myreader = sqlite_datareader.GetString(0);
                Console.WriteLine(myreader);
            }
            conn.Close();
        }
    }
}
