package com.bemtevi.bem_te_vi_api.dto;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Getter
@Setter
public class SignupDTO {
    @NotBlank
    @Size(min = 3, max = 30)
    private String username;
    @NotBlank
    @Size(max = 60)
    @Email
    private String email;
    @NotBlank
    @Size(min = 6, max = 60)
    private String password;

    public @NotBlank @Size(min = 3, max = 30) String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank @Size(min = 3, max = 30) String username) {
        this.username = username;
    }

    public @NotBlank @Size(max = 60) @Email String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank @Size(max = 60) @Email String email) {
        this.email = email;
    }

    public @NotBlank @Size(min = 6, max = 60) String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 6, max = 60) String password) {
        this.password = password;
    }
}
