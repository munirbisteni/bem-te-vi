package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.UserDTO;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.service.UserService;
import com.bemtevi.bem_te_vi_api.utils.UserMapper;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<String>> getFollowing(@PathVariable String userId) {
        List<String> following = userService.getFollowingByUserId(userId);

        if (following != null) {
            return ResponseEntity.ok(following);
        }

        return ResponseEntity.notFound().build();
    }
}
