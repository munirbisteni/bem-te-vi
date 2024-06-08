using api.Models;

namespace api.Services;

public interface IPostsService
{
    Task CreatePost(Post post);
    Task<Post?> UpdatePost(int id, Post post);
    Task<Post?> GetPost(int id);
    Task<List<Post?>> GetAllPosts();
    Task DeletePost(int id);
}
