using System.ComponentModel.DataAnnotations.Schema;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

[Table("Account")]
public class Account
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? UserName { get; set; }

    public string? Mail { get; set; }

    public string? Password { get; set; }

    public string? DisplayName { get; set; }

    public string? About { get; set; }

    public string? Avatar { get; set; }

    public string? CreatedAt { get; set; }

    public int PostCount { get; set; } = 0;

    public int FollowersCount { get; set; } = 0;

    public int FollowingCount { get; set; } = 0;
}
