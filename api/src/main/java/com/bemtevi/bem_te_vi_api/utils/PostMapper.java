package com.bemtevi.bem_te_vi_api.utils;

import com.bemtevi.bem_te_vi_api.dto.CommentDTO;
import com.bemtevi.bem_te_vi_api.dto.PostDTO;
import com.bemtevi.bem_te_vi_api.model.Comment;
import com.bemtevi.bem_te_vi_api.model.Post;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PostMapper {
    public static PostDTO toPostDTO(Post post) {

        List<Comment> commentsInput = post.getComments();
        if(commentsInput == null) {
            commentsInput = Collections.emptyList();
        }
        List<CommentDTO> comments = commentsInput.stream()
                .map(CommentMapper::toCommentDTO)
                .collect(Collectors.toList());

        return new PostDTO(
                post.getId(),
                post.getDescription(),
                post.getImageUrl(),
                post.getCreatedAt(),
                post.getAuthor().getId(),
                post.getLikes(),
                comments,
                post.getLikeCounter(),
                post.getCommentsCounter()
        );
    }
}
