package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.CreatePostDTO;
import com.bemtevi.bem_te_vi_api.dto.PostDTO;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.service.PostService;
import com.bemtevi.bem_te_vi_api.service.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

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
        return postService.createPost(createPostDTO.userId(), createPostDTO.description(), createPostDTO.image());
    }

    @PostMapping("/{postId}/like/{userId}")
    public void likePost(@PathVariable String postId, @PathVariable String userId) {
        postService.likePost(postId, userId);
    }

    @PostMapping("/{postId}/unlike/{userId}")
    public void unlikePost(@PathVariable String postId, @PathVariable String userId) {
        postService.unlikePost(postId, userId);
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

    @PutMapping("/{postId}/image")
    public ResponseEntity<Map<String, String>> updatePostImage(@PathVariable String postId, @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageBytes = file.getBytes();
            postService.uploadPostImage(postId, imageBytes);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Post image uploaded successfully.");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to upload image."));
        }
    }

    @GetMapping("/{postId}/image")
    public ResponseEntity<Map<String, String>> getPostImage(@PathVariable String postId) {
        Post post = postService.findById(postId);
        if (post == null || post.getImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Post image not found."));
        }

        String base64Image = Base64.getEncoder().encodeToString(post.getImage());
        return ResponseEntity.ok().body(Collections.singletonMap("image", base64Image));
    }
}
