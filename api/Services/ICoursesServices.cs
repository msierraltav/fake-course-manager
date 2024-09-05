
namespace Api.Services.Courses;

public interface  ICoursesService {
    Task<List<Course>> GetAllAsync();
    Task<Course?> GetByIdAsync(uint id);
    Task<Course> AddCourseRecord(Course course);
    Task<Course> DeleteCourse(Course course);
}