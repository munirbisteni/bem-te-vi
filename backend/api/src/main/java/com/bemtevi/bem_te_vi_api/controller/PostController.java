package com.bemtevi.bem_te_vi_api.controller;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.service.PostService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public Post createPost(@RequestParam String userId,
                           @RequestParam String description,
                           @RequestParam(required = false) String imageUrl) {
        return postService.createPost(userId, description, imageUrl);
    }

    @PostMapping("/{postId}/like")
    public void likePost(@PathVariable String postId, @RequestParam String userId) {
        postService.likePost(postId, userId);
    }

    @PostMapping("/{postId}/comment")
    public void addComment(@PathVariable String postId,
                           @RequestParam String userId,
                           @RequestParam String content) {
        postService.addComment(postId, userId, content);
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable String userId) {
        return postService.getPostsByUser(userId);
    }
}
