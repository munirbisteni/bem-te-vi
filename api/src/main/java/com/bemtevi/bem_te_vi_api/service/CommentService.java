package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.CommentRepository;
import com.bemtevi.bem_te_vi_api.repository.PostRepository;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

    public void addCommentToPost(String postId, String userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setId(randomUUID().toString());
        comment.setAuthor(user);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());
        post.getComments().add(comment);

        postRepository.save(post);
    }

    public void addReplyToComment(String commentId, String userId, String content) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment reply = new Comment();
        reply.setContent(content);
        reply.setAuthor(user);
        reply.setCreatedAt(LocalDateTime.now());
        comment.getComments().add(reply);

        commentRepository.save(comment);
    }

}
