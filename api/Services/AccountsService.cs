using api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Services;

public class AccountsService : IAccountsService
{
    private readonly IMongoCollection<Account> _accountsCollection;

    public AccountsService(
        IOptions<BemteviDatabaseSettings> bemteviDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            bemteviDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bemteviDatabaseSettings.Value.DatabaseName);

        _accountsCollection = mongoDatabase.GetCollection<Account>(
            bemteviDatabaseSettings.Value.AccountsCollectionName);
    }

    public async Task<List<Account>> GetAccounts() =>
        await _accountsCollection.Find(_ => true).ToListAsync();

    public async Task<Account?> GetAccount(string id) =>
        await _accountsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAccount(Account newAccount) =>
        await _accountsCollection.InsertOneAsync(newAccount);

    public async Task UpdateAccount(string id, Account updatedAccount) =>
        await _accountsCollection.ReplaceOneAsync(x => x.Id == id, updatedAccount);

    public async Task DeleteAccount(string id) =>
        await _accountsCollection.DeleteOneAsync(x => x.Id == id);
}
