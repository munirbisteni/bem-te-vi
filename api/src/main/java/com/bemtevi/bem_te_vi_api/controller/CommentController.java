package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.CommentDTO;
import com.bemtevi.bem_te_vi_api.dto.CreateCommentDTO;
import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{postId}/comments")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/{postId}/comments")
    public void addComment(@PathVariable String postId, @RequestBody CreateCommentDTO dto) {
        commentService.addCommentToPost(postId, dto.userId(), dto.content());
    }
}
