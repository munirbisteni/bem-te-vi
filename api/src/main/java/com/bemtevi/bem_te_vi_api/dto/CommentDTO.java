package com.bemtevi.bem_te_vi_api.dto;


import java.time.LocalDateTime;
import java.util.List;

public record CommentDTO(String id, String content, LocalDateTime createdAt, String author) {}