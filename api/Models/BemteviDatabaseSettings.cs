namespace api.Models;

public class BemteviDatabaseSettings
{
    public string ConnectionString { get; set; } = "mongodb://localhost:27017";

    public string DatabaseName { get; set; } = "bemtevi";

    public string AccountsCollectionName { get; set; } = "Accounts";

    public string PostsCollectionName { get; set; } = "Posts";
}