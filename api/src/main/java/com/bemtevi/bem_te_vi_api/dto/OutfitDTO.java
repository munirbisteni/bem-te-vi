package com.bemtevi.bem_te_vi_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OutfitDTO {
    private String id;
    private String name;
    private ClothingDTO top;
    private ClothingDTO bottom;
    private String userId;
}