package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.UserDTO;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.service.UserService;
import com.bemtevi.bem_te_vi_api.utils.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{userId}/follow/{otherUserId}")
    public void follow(@PathVariable String userId, @PathVariable String otherUserId) {
        userService.follow(userId, otherUserId);
    }

    @GetMapping("/{userId}/is-following/{otherUserId}")
    public ResponseEntity<Boolean> isFollowing(@PathVariable String userId, @PathVariable String otherUserId) {
        return ResponseEntity.ok(userService.isFollowing(userId, otherUserId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String userId) {
        User user = userService.findById(userId);

        return user == null
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(UserMapper.toUserDTO(user));
    }

    @PutMapping("/{userId}/about")
    public void updateUserAbout(@PathVariable String userId, @RequestBody String about) {
        userService.updateUserAbout(userId, about);
    }

    @PutMapping("/{userId}/profile-image")
    public ResponseEntity<Map<String, String>> updateProfileImage(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageBytes = file.getBytes();
            userService.uploadProfileImage(userId, imageBytes);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile image uploaded successfully.");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to upload image."));
        }
    }

    @GetMapping("/{userId}/profile-image")
    public ResponseEntity<Map<String, String>> getProfileImage(@PathVariable String userId) {
        User user = userService.findById(userId);
        if (user == null || user.getProfileImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Profile image not found."));
        }

        String base64Image = Base64.getEncoder().encodeToString(user.getProfileImage());
        return ResponseEntity.ok().body(Collections.singletonMap("profileImage", base64Image));
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<String>> getFollowing(@PathVariable String userId) {
        List<String> following = userService.getFollowingByUserId(userId);

        if (following != null) {
            return ResponseEntity.ok(following);
        }

        return ResponseEntity.notFound().build();
    }
}
