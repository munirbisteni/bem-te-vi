using api.Models;
using api.Services;

using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AccountsController : ControllerBase
{
    private readonly AccountsService _accountsService;

    public AccountsController(AccountsService accountsService) =>
        _accountsService = accountsService;

    [HttpGet]
    public async Task<List<Account>> Get() =>
        await _accountsService.GetAccounts();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Account>> Get(string id)
    {
        var account = await _accountsService.GetAccount(id);

        if (account is null)
        {
            return NotFound();
        }

        return account;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Account newAccount)
    {
        await _accountsService.CreateAccount(newAccount);

        return CreatedAtAction(nameof(Get), new { id = newAccount.Id }, newAccount);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Account updatedAccount)
    {
        var account = await _accountsService.GetAccount(id);

        if (account is null)
        {
            return NotFound();
        }

        updatedAccount.Id = account.Id;

        await _accountsService.UpdateAccount(id, updatedAccount);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var account = await _accountsService.GetAccount(id);

        if (account is null)
        {
            return NotFound();
        }

        await _accountsService.DeleteAccount(id);

        return NoContent();
    }
}
