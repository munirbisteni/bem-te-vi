package com.bemtevi.bem_te_vi_api.utils;

import com.bemtevi.bem_te_vi_api.dto.CommentDTO;
import com.bemtevi.bem_te_vi_api.model.Comment;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

public class CommentMapper {
    public static CommentDTO toCommentDTO(Comment comment) {
        if (comment == null) {
            // Retorna um DTO vazio com campos padrão
            return new CommentDTO(
                    "", // id vazio
                    "", // content vazio
                    null, // createdAt como null
                    "", // author id vazio
                    emptyList() // lista de replies vazia
            );
        }

        List<Comment> replies = comment.getComments() == null ? emptyList() : comment.getComments();

        List<CommentDTO> repliesConverted = replies.stream()
                .map(CommentMapper::toCommentDTO)
                .collect(Collectors.toList());

        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getAuthor().getId(),
                repliesConverted
        );
    }
}
