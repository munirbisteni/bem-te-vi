package com.bemtevi.bem_te_vi_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Data
@RequiredArgsConstructor
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    @NonNull
    private String username;

    @NonNull
    private String displayName;

    private String about;

    private byte[] profileImage;

    @Indexed(unique = true)
    @NonNull
    private String mail;

    @JsonIgnore
    @NonNull
    private String password;

    @Getter
    private List<String> following = new ArrayList<>();

    @Getter
    private List<String> followers = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public @NonNull String getPassword() {
        return password;
    }

    @Override
    public @NonNull String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

