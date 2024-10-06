package com.bemtevi.bem_te_vi_api.dto;


public record UserDTO(String id, String displayName, String about, String avatar, int postCount, int followersCount, int followingCount) {}
