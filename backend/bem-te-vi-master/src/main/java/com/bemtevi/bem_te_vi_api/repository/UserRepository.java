package com.bemtevi.bem_te_vi_api.repository;


import com.bemtevi.bem_te_vi_api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
