using Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// accept origin from localhost.
// for production, you should use a real domain name here.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(["http://localhost:3000", "http://149.50.129.19"])
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// get connection string from env variable ( for docker ) or from config in dev mode.
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")?? builder.Configuration.GetConnectionString("WebApiDatabase");

builder.Services.AddDbContext<AppDbContext>(options =>  options.UseNpgsql(connectionString));

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
