package com.bemtevi.bem_te_vi_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupDTO(
        @NotBlank @Size(min = 3, max = 30) String username,
        @NotBlank @Size(max = 100) String displayName,
        @NotBlank @Size(max = 60) @Email String email,
        @NotBlank @Size(min = 6, max = 60) String password
) { }
