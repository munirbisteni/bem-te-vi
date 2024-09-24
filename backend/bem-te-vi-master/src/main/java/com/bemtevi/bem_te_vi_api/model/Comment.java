package com.bemtevi.bem_te_vi_api.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
public class Comment {

    @Id
    private String id;
    private String content;
    private LocalDateTime createdAt;

    @DBRef
    private User author;

    @DBRef
    private List<Comment> comments;
}
