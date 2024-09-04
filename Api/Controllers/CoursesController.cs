using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CoursesController : ControllerBase{

    private readonly ILogger<CoursesController> _logger;
    // lets create a example db of courses.
    private static List<CourseRecord> _courseRecords = new List<CourseRecord>();

    public CoursesController(ILogger<CoursesController> logger){

        _logger = logger;

        if(_courseRecords == null || _courseRecords.Count == 0)
        {
            // lets add 2 default records
            CourseRecord introToBiology = new CourseRecord{
                Id = 1,
                Subject = "BIO",
                CourseNumber = "101",
                Description = "Introduction to Biology",
            };

            CourseRecord businessStatistics = new CourseRecord{
                Id = 2,
                Subject = "Mat",
                CourseNumber = "045",
                Description = "Business Statistics",
            };

            _courseRecords.Add(introToBiology);
            _courseRecords.Add(businessStatistics);
        }
    }

    [HttpGet(Name = "GetAllCourses")]
    [Route("[action]")]
    public IEnumerable<CourseRecord> Get(){
        return _courseRecords;
    }

    [HttpPost]
    public IActionResult Post(CourseRecord course){
        if(!ModelState.IsValid)
            return BadRequest("Not valid Course Record.");

        _courseRecords.Add(course);
        // lets return the newly created record.
        return CreatedAtRoute("GetAllCourses", new {id = course.Id}, course);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(uint id){
        // lets find the record we want to delete.
        var course = _courseRecords.FirstOrDefault(c => c.Id == id);
        if(course == null)
            return NotFound();

        _courseRecords.Remove(course);
        return Ok($"Course {id} deleted successfully");
    }

}