package com.bemtevi.bem_te_vi_api.controller;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class LikeController {

    @Autowired
    private PostRepository postRepository;

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<String> unlikePost(@PathVariable String postId, @RequestBody String userId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        if (!post.getLikes().contains(userId)) {
            return ResponseEntity.badRequest().body("Post not liked yet");
        }

        post.getLikes().remove(userId);
        postRepository.save(post);

        return ResponseEntity.ok("Like removed successfully. Total likes: " + post.getLikeCounter());
    }

    @GetMapping("/{postId}/likes")
    public ResponseEntity<Integer> getLikesCount(@PathVariable String postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(post.getLikeCounter());
    }

    @GetMapping("/{postId}/likes/users")
    public ResponseEntity<List<String>> getLikedUsers(@PathVariable String postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(post.getLikes());
    }
}
