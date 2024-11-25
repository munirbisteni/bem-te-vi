package com.bemtevi.bem_te_vi_api.utils;

import com.bemtevi.bem_te_vi_api.dto.CommentDTO;
import com.bemtevi.bem_te_vi_api.model.Comment;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

public class CommentMapper {
    public static CommentDTO toCommentDTO(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUserId()
        );
    }
}
