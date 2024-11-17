package com.bemtevi.bem_te_vi_api.model;


import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.time.LocalDateTime;
import java.util.List;
@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String description;
    @Getter
    private byte[] image;
    private LocalDateTime createdAt;

    @DBRef
    private User author;

    private List<String> likes = List.of();

    @DBRef
    private List<Comment> comments = List.of();

    public int getLikeCounter() {
        return likes.size();
    }

    public int getCommentsCounter() {
        return comments.size();
    }
}
