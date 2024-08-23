using api.Models;
using api.Services;

using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class PostsController : ControllerBase
{
    private readonly PostsService _postsService;

    public PostsController(PostsService postsService) =>
        _postsService = postsService;

    [HttpGet]
    public async Task<List<Post>> Get() =>
        await _postsService.GetPosts();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Post>> Get(string id)
    {
        var post = await _postsService.GetPost(id);

        if (post is null)
        {
            return NotFound();
        }

        return post;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Post newPost)
    {
        await _postsService.CreatePost(newPost);

        return CreatedAtAction(nameof(Get), new { id = newPost.Id }, newPost);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Post updatedPost)
    {
        var post = await _postsService.GetPost(id);

        if (post is null)
        {
            return NotFound();
        }

        updatedPost.Id = post.Id;

        await _postsService.UpdatePost(id, updatedPost);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var post = await _postsService.GetPost(id);

        if (post is null)
        {
            return NotFound();
        }

        await _postsService.DeletePost(id);

        return NoContent();
    }
}
