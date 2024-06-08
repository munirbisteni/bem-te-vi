using api.Models;

namespace api.Services;

public interface IAccountsService
{
    Task<List<Account>> GetAccounts();

    Task<Account?> GetAccount(string id);

    Task CreateAccount(Account newAccount);

    Task UpdateAccount(string id, Account updatedAccount);

    Task RemoveAccount(string id);
}
