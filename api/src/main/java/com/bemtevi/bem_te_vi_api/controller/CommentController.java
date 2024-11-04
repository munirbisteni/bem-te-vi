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

    @PostMapping("/")
    public void addComment(@RequestBody CreateCommentDTO dto) {
        commentService.addCommentToPost(dto.postId(), dto.userId(), dto.content());
    }


    // TODO: Create reply

    @PostMapping("/{commentId}")
    public void addReply(@PathVariable String commentId,
                         @RequestParam String userId,
                         @RequestParam String content) {
        commentService.addReplyToComment(commentId, userId, content);
    }

    // TODO: Delete reply

    // TODO: Delete comment

    // TODO: Update comment

    //TODO: Update reply
}
