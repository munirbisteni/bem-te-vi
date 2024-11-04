package com.bemtevi.bem_te_vi_api.utils;

import com.bemtevi.bem_te_vi_api.dto.UserDTO;
import com.bemtevi.bem_te_vi_api.model.User;

public class UserMapper {
    public static UserDTO toUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getDisplayName(),
                user.getAbout()
        );
    }
}
