using Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// accept all origins, only as example for our fake course manager app.
builder.Services.AddCors(options =>
{
   options.AddDefaultPolicy(builder =>{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
   });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>  options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase")));

// builder.Services.AddScoped<ICoursesService, CoursesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.InitializeDb();

app.Run();
