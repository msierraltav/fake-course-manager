namespace Api.Models;


public class AddCourseDto{
    public Guid Id { get; set; }

    public string? Subject { get; set; }

    public string? CourseNumber { get; set; }

    public string? Description { get; set; }
}