using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public class Post
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string? Author { get; set; }

    public string? Caption { get; set; }

    public string? Media { get; set; }

    public string? Visibility { get; set; }

    public string? CreatedAt { get; set; }

    public int FavoritesCount { get; set; } = 0;

    public int CommentsCount { get; set; } = 0;

    public bool Favorited { get; set; } = false;
}
