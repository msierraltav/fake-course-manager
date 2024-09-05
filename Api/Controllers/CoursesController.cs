using Api.Data;
using Api.Models;
using Api.Services.Courses;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CoursesController : ControllerBase{

    private readonly ILogger<CoursesController> _logger;

    // private readonly ICoursesService _courseService;
    private readonly AppDbContext _dbContext;

    public CoursesController(AppDbContext dbContext,ILogger<CoursesController> logger){

        _logger = logger;
        // _courseService = courseService;
        _dbContext = dbContext;
    }

    //http://localhost:5020/api/Courses/GetAll
    [HttpGet]
    [Route("[action]")]
    public  IActionResult GetAll(){
        var allCourses =  _dbContext.Courses.ToList();
        return Ok(allCourses);
    }

    // http://localhost:5020/api/Courses/GetById?id=1
    [HttpGet]
    [Route("[action]")]
    public IActionResult GetById(Guid id){
        var course = _dbContext.Courses.Find(id);
        if(course == null){
            _logger.LogInformation($"Course with Id ${id} was not found");
            return NotFound();
        }
            
        return Ok(course);
    }

    // http://localhost:5020/api/Courses/AddCourseRecord
    [HttpPost]
    [Route("[action]")]
    public IActionResult AddCourseRecord(AddCourseDto course){
        if(!ModelState.IsValid)
            return BadRequest("Not valid Course Record.");

        if(string.IsNullOrEmpty(course.CourseNumber))
            return BadRequest("Course Number must be 3 digits");

        if(course.CourseNumber?.Length != 3 || !course.CourseNumber.All(char.IsNumber)){
            return BadRequest("Not Valid Course Number");
        }

        var newCourse = new Course(){
            CourseNumber = course.CourseNumber,
            Subject = course.Subject,
            Description = course.Description
        };

        _dbContext.Add(newCourse);
        _dbContext.SaveChanges();
        return CreatedAtAction("GetById", new {id = newCourse.Id}, newCourse);
    }

    [HttpPut]
    public IActionResult UpdateCourse(){
        throw new NotImplementedException();
    }

    [HttpDelete("{id}")]
    public  IActionResult Delete(Guid id){
        // lets find the record we want to delete.
        var course = _dbContext.Courses.Find(id);
        if(course == null)
            return NotFound();
        var deleted = _dbContext.Remove(id);
        return Ok($"Course {deleted} deleted successfully");
    }
}