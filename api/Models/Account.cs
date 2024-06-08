using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace api.Models;

public class Account
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("UserName")]
    [JsonPropertyName("UserName")]
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
