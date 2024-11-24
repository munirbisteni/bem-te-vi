package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.dto.ClothingDTO;
import com.bemtevi.bem_te_vi_api.dto.ClothingRequest;
import com.bemtevi.bem_te_vi_api.model.Clothing;
import com.bemtevi.bem_te_vi_api.repository.ClothingRepository;
import com.bemtevi.bem_te_vi_api.utils.ClothingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClothingService {

    private final ClothingRepository clothingRepository;

    public List<ClothingDTO> findAllByUserId(String userId) {
        return clothingRepository.findByUserId(userId)
                .stream()
                .map(ClothingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClothingDTO findById(String id) throws ChangeSetPersister.NotFoundException {
        return clothingRepository.findById(id)
                .map(ClothingMapper::toDTO)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public void addClothing(ClothingRequest clothingRequest) {
        byte[] imageBytes = Base64.getDecoder().decode(clothingRequest.getImageBase64());
        Clothing clothing = ClothingMapper.toEntity(clothingRequest, imageBytes);
        clothingRepository.save(clothing);
    }
}
