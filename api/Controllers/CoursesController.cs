using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CoursesController : ControllerBase
{

    private readonly ILogger<CoursesController> _logger;

    private readonly AppDbContext _dbContext;

    public CoursesController(AppDbContext dbContext, ILogger<CoursesController> logger)
    {

        _logger = logger;
        _dbContext = dbContext;
    }

    //http://localhost:5020/api/Courses/GetAll?q=sometext
    [HttpGet]
    [Route("[action]")]
    public IActionResult GetAll()
    {
        var allCourses = new List<Course>();

        var query = Request.Query["q"].ToString().Trim().ToLower();

        if (!string.IsNullOrEmpty(query))
        {
            allCourses = _dbContext.Courses
                .Where(c => c.Description.ToLower().Contains(query)).ToList();
        }
        else
        {
            allCourses = _dbContext.Courses.ToList();
        }
        return Ok(allCourses);
    }

    // http://localhost:5020/api/Courses/GetById?id=1
    [HttpGet]
    [Route("[action]")]
    public IActionResult GetById(Guid id)
    {
        var course = _dbContext.Courses.Find(id);
        if (course == null)
        {
            _logger.LogInformation($"Course with Id ${id} was not found");
            return NotFound();
        }

        return Ok(course);
    }

    // http://localhost:5020/api/Courses/AddCourseRecord
    [HttpPost]
    [Route("[action]")]
    public IActionResult AddCourseRecord(AddCourseDto course)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not valid Course Record.");

        if (string.IsNullOrEmpty(course.CourseNumber))
            return BadRequest("Course Number must be 3 digits");

        if (course.CourseNumber?.Length != 3 || !course.CourseNumber.All(char.IsNumber))
        {
            return BadRequest("Not Valid Course Number");
        }

        // check if exist another course if the courseNumber and description already exists
        bool numberExists = _dbContext.Courses.Any(c => c.CourseNumber == course.CourseNumber);
        bool descriptionExists = _dbContext.Courses.Any(c => c.Description == course.Description);


        if (numberExists)
            return BadRequest("A Course with the same Course Number already exists");
        if (descriptionExists)
            return BadRequest("A Course with the same Description already exists");

        var newCourse = new Course()
        {
            CourseNumber = course.CourseNumber,
            Subject = course.Subject,
            Description = course.Description
        };

        _dbContext.Add(newCourse);
        _dbContext.SaveChanges();
        return CreatedAtAction("GetById", new { id = newCourse.Id }, newCourse);
    }

    //http://localhost:5020/api/Courses/{id}
    [HttpDelete]
    [Route("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        // lets find the record we want to delete.
        var course = _dbContext.Courses.Find(id);
        if (course == null)
            return NotFound();
        _dbContext.Remove(course);
        _dbContext.SaveChanges();
        return Ok();
    }
}