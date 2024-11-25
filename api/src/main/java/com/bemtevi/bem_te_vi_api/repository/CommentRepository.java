package com.bemtevi.bem_te_vi_api.repository;

import com.bemtevi.bem_te_vi_api.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByPostId(String postId);
}

