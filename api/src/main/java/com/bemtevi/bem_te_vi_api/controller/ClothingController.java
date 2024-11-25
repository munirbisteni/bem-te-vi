package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.ClothingDTO;
import com.bemtevi.bem_te_vi_api.dto.ClothingRequest;
import com.bemtevi.bem_te_vi_api.service.ClothingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clothing")
@RequiredArgsConstructor
public class ClothingController {
        private final ClothingService clothingService;

        @GetMapping
        public ResponseEntity<List<ClothingDTO>> getAllClothing(@RequestParam String userId) {
            List<ClothingDTO> clothingList = clothingService.findAllByUserId(userId);
            return ResponseEntity.ok(clothingList);
        }

        @GetMapping("/{id}")
        public ResponseEntity<ClothingDTO> getClothingById(@PathVariable String id) throws ChangeSetPersister.NotFoundException {
            ClothingDTO clothing = clothingService.findById(id);
            return ResponseEntity.ok(clothing);
        }

        @PostMapping
        public ResponseEntity<Map<String, String>> createClothing(@RequestBody ClothingRequest clothingRequest) {
            clothingService.addClothing(clothingRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Clothing item created successfully!"));
        }
    }
