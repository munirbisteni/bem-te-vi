package com.bemtevi.bem_te_vi_api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "outfits")
@AllArgsConstructor
public class Outfit {

    @Id
    private String id;
    private String name;
    private String topId;    // Reference to the ID of a top clothing item
    private String bottomId; // Reference to the ID of a bottom clothing item
    private String userId;
}
