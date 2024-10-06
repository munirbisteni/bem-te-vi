package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.CreatePostDTO;
import com.bemtevi.bem_te_vi_api.dto.PostDTO;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.service.PostService;
import com.bemtevi.bem_te_vi_api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
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

    @GetMapping("/user/{userId}/following")
    public ResponseEntity<List<PostDTO>> getPostsByFollowing(@PathVariable String userId) {
        // Fetches current user following list
        List<String> following = userService.getFollowingByUserId(userId);
        // Fetches following list posts
        List<PostDTO> posts = postService.getPostsByUserIds(following);

        return ResponseEntity.ok(posts);
    }
}
