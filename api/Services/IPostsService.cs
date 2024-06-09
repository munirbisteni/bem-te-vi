using api.Models;

namespace api.Services;

public interface IPostsService
{
    Task<List<Post>> GetPosts();

    Task<Post?> GetPost(string id);

    Task CreatePost(Post newPost);

    Task UpdatePost(string id, Post udpatedPost);

    Task DeletePost(string id);
}
