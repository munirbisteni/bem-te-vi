using api.Infra;
using api.Models;

using Microsoft.Extensions.Options;

using MongoDB.Driver;

namespace api.Services;

public class PostsService
{
    private readonly IMongoCollection<Post> _postsCollection;

    public PostsService(
        IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(
            DatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            DatabaseSettings.Value.DatabaseName);

        _postsCollection = mongoDatabase.GetCollection<Post>(
            DatabaseSettings.Value.PostsCollectionName);
    }

    public async Task<List<Post>> GetPosts() =>
        await _postsCollection.Find(_ => true).ToListAsync();

    public async Task<Post?> GetPost(string id) =>
        await _postsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreatePost(Post newPost) =>
        await _postsCollection.InsertOneAsync(newPost);

    public async Task UpdatePost(string id, Post updatedPost) =>
        await _postsCollection.ReplaceOneAsync(x => x.Id == id, updatedPost);

    public async Task DeletePost(string id) =>
        await _postsCollection.DeleteOneAsync(x => x.Id == id);
}
