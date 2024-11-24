package com.bemtevi.bem_te_vi_api.repository;

import com.bemtevi.bem_te_vi_api.model.Outfit;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OutfitRepository extends MongoRepository<Outfit, String> {
    List<Outfit> findByUserId(String userId); // Buscar conjuntos pelo ID do usuário
}