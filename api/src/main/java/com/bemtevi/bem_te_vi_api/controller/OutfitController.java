package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.OutfitDTO;
import com.bemtevi.bem_te_vi_api.dto.OutfitRequest;
import com.bemtevi.bem_te_vi_api.service.OutfitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/outfits")
@RequiredArgsConstructor
public class OutfitController {

    private final OutfitService outfitService;


    @GetMapping
    public ResponseEntity<List<OutfitDTO>> getAllOutfits(@RequestParam String userId) {
        List<OutfitDTO> outfitList = outfitService.findAllByUserId(userId);
        return ResponseEntity.ok(outfitList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OutfitDTO> getOutfitById(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
        OutfitDTO outfit = outfitService.findById(id);
        return ResponseEntity.ok(outfit);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createOutfit(@RequestBody OutfitRequest outfitRequest) {
        outfitService.addOutfit(outfitRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Outfit created successfully!"));
    }
}