package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
