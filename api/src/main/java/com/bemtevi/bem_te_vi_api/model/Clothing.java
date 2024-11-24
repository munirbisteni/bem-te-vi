package com.bemtevi.bem_te_vi_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "clothing")
@AllArgsConstructor
@NoArgsConstructor
public class Clothing {
    @Id
    private String id;
    private String name;
    private AccessoryType type; // Enum to indicate if it's upper (TOP) or lower (BOTTOM) clothing
    private String userId;
    private byte[] imageBase64;
}
