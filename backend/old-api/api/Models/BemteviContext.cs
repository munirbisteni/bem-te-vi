using api.Infra;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace api.Models;

public class BemteviContext(
    IOptions<DatabaseSettings> settings,
    IMongoClient client)
{
    private readonly IMongoDatabase _database = client.GetDatabase(settings.Value.DatabaseName);

    public IMongoCollection<Account> Accounts => _database.GetCollection<Account>("Accounts");

    public IMongoCollection<Post> Posts => _database.GetCollection<Post>("Posts");
}
