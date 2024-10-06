package com.bemtevi.bem_te_vi_api.repository;

import com.bemtevi.bem_te_vi_api.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
}

