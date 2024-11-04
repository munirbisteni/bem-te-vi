package com.bemtevi.bem_te_vi_api.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PostDTO(String id, String description, String imageUrl, LocalDateTime createdAt, String author, List<String> likes, List<CommentDTO> comments, Integer likeCount, Integer commentsCount) {
}
