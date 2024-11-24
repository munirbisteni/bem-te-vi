package com.bemtevi.bem_te_vi_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OutfitRequest {
    private String name;
    private String topId; // ID of the top clothing item
    private String bottomId; // ID of the bottom clothing item
    private String userId;
}

