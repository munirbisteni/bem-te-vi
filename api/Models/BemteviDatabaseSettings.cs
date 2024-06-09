using Microsoft.Extensions.Logging.Abstractions;

namespace api.Models;

public class BemteviDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;
    public string AccountsCollectionName { get; set; } = null!;

    public string PostsCollectionName { get; set; } = null!;
}