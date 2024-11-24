package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.dto.ClothingDTO;
import com.bemtevi.bem_te_vi_api.dto.OutfitDTO;
import com.bemtevi.bem_te_vi_api.dto.OutfitRequest;
import com.bemtevi.bem_te_vi_api.model.Outfit;
import com.bemtevi.bem_te_vi_api.repository.OutfitRepository;
import com.bemtevi.bem_te_vi_api.utils.OutfitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OutfitService {

    private final OutfitRepository outfitRepository;
    private final ClothingService clothingService;

    public List<OutfitDTO> findAllByUserId(String userId) {
        return outfitRepository.findByUserId(userId)
                .stream()
                .map(outfit -> {
                    // Fetch clothing details for top and bottom
                    ClothingDTO top = null;
                    try {
                        top = clothingService.findById(outfit.getTopId());
                    } catch (ChangeSetPersister.NotFoundException e) {
                        throw new RuntimeException(e);
                    }
                    ClothingDTO bottom = null;
                    try {
                        bottom = clothingService.findById(outfit.getBottomId());
                    } catch (ChangeSetPersister.NotFoundException e) {
                        throw new RuntimeException(e);
                    }
                    // Map to OutfitDTO
                    return OutfitMapper.toDTO(outfit, top, bottom);
                })
                .collect(Collectors.toList());
    }
    public OutfitDTO findById(String id) throws ChangeSetPersister.NotFoundException {
        Outfit outfit = outfitRepository.findById(id)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);

        // Fetch clothing details for top and bottom
        ClothingDTO top = clothingService.findById(outfit.getTopId());
        ClothingDTO bottom = clothingService.findById(outfit.getBottomId());

        // Map to OutfitDTO
        return OutfitMapper.toDTO(outfit, top, bottom);
    }

    public void addOutfit(OutfitRequest outfitRequest) {

        Outfit outfit = OutfitMapper.toEntity(outfitRequest);
        outfitRepository.save(outfit);
    }
}
