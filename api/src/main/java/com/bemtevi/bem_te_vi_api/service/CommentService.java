package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.CommentRepository;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.UUID.randomUUID;

@Service
public class CommentService {

    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    public CommentService(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findAllByPostId(postId);
    }

    public void addCommentToPost(String postId, String userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setUserId(userId);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setPostId(postId);
        post.getComments().add(comment);

        commentRepository.save(comment);
        postRepository.save(post);
    }
}
