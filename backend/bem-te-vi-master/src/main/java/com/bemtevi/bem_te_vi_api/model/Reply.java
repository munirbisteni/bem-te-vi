package com.bemtevi.bem_te_vi_api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Reply {
    @Id
    private Long id;
    private String content;
    private LocalDateTime createdAt;

    @DBRef
    private User author;

    @DBRef
    private Comment comment;
}
