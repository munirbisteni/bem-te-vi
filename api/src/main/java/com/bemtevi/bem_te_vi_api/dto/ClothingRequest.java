package com.bemtevi.bem_te_vi_api.dto;

import com.bemtevi.bem_te_vi_api.model.AccessoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClothingRequest {
    private String name;
    private AccessoryType tag;
    private String userId;
    private String imageBase64; // Image in Base64
}
