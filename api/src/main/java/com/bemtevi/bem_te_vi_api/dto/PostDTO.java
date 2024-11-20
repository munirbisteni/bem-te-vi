package com.bemtevi.bem_te_vi_api.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PostDTO(String id, String description, byte[] image, LocalDateTime createdAt, String author, String authorName, List<String> likes, List<CommentDTO> comments, Integer likeCount, Integer commentsCount) {
}
