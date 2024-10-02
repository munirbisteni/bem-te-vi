package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.CreatePostDTO;
import com.bemtevi.bem_te_vi_api.dto.PostDTO;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.service.PostService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public Post createPost(@RequestBody CreatePostDTO createPostDTO) {
        return postService.createPost(createPostDTO.userId(), createPostDTO.description(), createPostDTO.imageUrl());
    }

    @PostMapping("/{postId}/like")
    public void likePost(@PathVariable String postId, @RequestParam String userId) {
        postService.likePost(postId, userId);
    }

    @GetMapping("/user/{userId}")
    public List<PostDTO> getPostsByUser(@PathVariable String userId) {
        return postService.getPostsByUser(userId);
    }
}
