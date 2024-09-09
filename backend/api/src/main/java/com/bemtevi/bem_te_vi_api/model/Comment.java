package com.bemtevi.bem_te_vi_api.model;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Data
public class Comment {

    private String id;
    private String content;
    private LocalDateTime createdAt;

    @DBRef
    private User author;

    public void setAuthor(User user) {
    }

    public void setContent(String content) {
    }

    public void setCreatedAt(LocalDateTime now) {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getAuthor() {
        return author;
    }
}
