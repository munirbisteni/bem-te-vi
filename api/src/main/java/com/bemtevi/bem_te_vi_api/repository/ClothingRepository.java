package com.bemtevi.bem_te_vi_api.repository;

import com.bemtevi.bem_te_vi_api.model.Clothing;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClothingRepository extends MongoRepository<Clothing, String> {
    List<Clothing> findByUserId(String userId);
}