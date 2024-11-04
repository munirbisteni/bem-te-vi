package com.bemtevi.bem_te_vi_api.dto;


public record UserDTO(
        String id,
        String username,
        String displayName,
        String about
) {}
