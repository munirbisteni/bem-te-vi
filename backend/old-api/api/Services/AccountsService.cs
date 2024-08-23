using api.Infra;
using api.Models;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace api.Services;

public class AccountsService(
    IOptions<DatabaseSettings> databaseSettings,
    IMongoDatabase database)
{
    private readonly IMongoCollection<Account> _accountsCollection = database.GetCollection<Account>(databaseSettings.Value.AccountsCollectionName);

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
