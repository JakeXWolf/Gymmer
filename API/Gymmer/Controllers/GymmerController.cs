using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gymmer.DAL;
using Gymmer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace Gymmer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // Allow CORS for all origins. (Caution!)
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GymmerController : ControllerBase
    {
        GymmerDAL _gymmerDAL = new GymmerDAL();

        // GET: api/Gymmer/GetExercisesByAreaId?id=
        [HttpGet("GetExercisesByAreaId")]
        public ActionResult<IEnumerable<ExerciseOption>> GetExercisesByAreaId(int id)
        {
            List<ExerciseOption> exerciseOptions = _gymmerDAL.GetExerciseOptions(id);
            return exerciseOptions.ToArray();
        }

        // GET: api/Gymmer/GetAreas
        [HttpGet("GetAreas")]
        public ActionResult<IEnumerable<Area>> GetAreas()
        {
            List<Area> areas = _gymmerDAL.GetAreas();
            return areas.ToArray();
        }

        // GET: api/Gymmer/GetUserWorkouts?userId=
        //[HttpGet("GetUserWorkouts")]
        //public ActionResult<IEnumerable<Area>> GetUserWorkouts(int userId, int workoutId)
        //{
        //    List<Area> areas = _gymmerDAL.GetUserWorkouts(userId, workoutId);
        //    return areas.ToArray();
        //}

        // GET: api/Gymmer/GetUserExercises?workoutId=
        [HttpGet("GetUserExercises")]
        public ActionResult<IEnumerable<UserExercise>> GetUserExercises(int workoutId)
        {
            List<UserExercise> userExercises = _gymmerDAL.GetUserExercises(workoutId);
            return userExercises;
        }

        #region Examples

        // GET: api/Gymmer
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Gymmer/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Gymmer
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Gymmer/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        #endregion
    }
}
