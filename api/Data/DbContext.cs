using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
    }
}