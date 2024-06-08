using api.Models;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<BemteviDatabaseSettings>(
    builder.Configuration.GetSection("bemteviDatabase"));

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IPostsService, PostsService>();
builder.Services.AddSingleton<PostsService>();
builder.Services.AddScoped<IAccountsService, AccountsService>();
builder.Services.AddSingleton<AccountsService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
