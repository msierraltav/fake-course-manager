using Microsoft.EntityFrameworkCore;
using Api.Data;
using System.Runtime.CompilerServices;

namespace Api.Services.Courses;

public class CoursesService : ICoursesService {

    private readonly AppDbContext _context;

    public CoursesService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Course>> GetAllAsync() {
        return await _context.Courses.ToListAsync();
    }

    public async Task<Course?> GetByIdAsync(uint id) {
       return await _context.Courses.FindAsync(id);
    }

    public async Task<Course> AddCourseRecord(Course course){
        await _context.Courses.AddAsync(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course> DeleteCourse(Course course){
        _context.Courses.Remove(course); 
        await _context.SaveChangesAsync();
        return course;
    }
}

