package com.bemtevi.bem_te_vi_api.dto;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;


@Getter
@Setter
public class LoginDTO {
    @NotBlank
    private String username;
    @NotBlank
    private String password;

    public @NotBlank String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank String username) {
        this.username = username;
    }

    public @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank String password) {
        this.password = password;
    }
}
