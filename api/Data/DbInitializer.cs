using System;
using Api;
using Api.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public static class DBInitializer{
    public static void InitializeDb(this IApplicationBuilder app){

        using var scope = app.ApplicationServices.CreateScope();
        var service = scope.ServiceProvider;
        var context = service.GetRequiredService<AppDbContext>();
        
        context.Database.EnsureCreated();
        if(context.Courses.Any()){
            return;
        }

        Course[] courses = new Course[]{
            new Course{
                Subject = "BIO",
                CourseNumber = "101",
                Description = "Introduction to Biology",
            },
            new Course{
                Subject = "Mat",
                CourseNumber = "045",
                Description = "Business Statistics",
            }
        };

        foreach (Course c in courses){
            context.Courses.Add(c);
        }

        context.SaveChanges();
    }
}