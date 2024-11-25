package com.bemtevi.bem_te_vi_api.service;

import com.bemtevi.bem_te_vi_api.model.Post;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    public boolean isFollowing(String userId, String anotherUserId) {
        User user = userRepository.findById(anotherUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return user.getFollowers().contains(userId);
    }

    public void follow(String userId, String anotherUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User anotherUser = userRepository.findById(anotherUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (anotherUser.getFollowers().contains(userId)) {
            unfollow(userId, anotherUserId);
            return;
        }

        user.getFollowing().add(anotherUserId);
        anotherUser.getFollowers().add(userId);
        userRepository.save(user);
        userRepository.save(anotherUser);
    }

    public void unfollow(String userId, String anotherUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User anotherUser = userRepository.findById(anotherUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.getFollowing().remove(anotherUserId);
        anotherUser.getFollowers().remove(userId);

        userRepository.save(user);
        userRepository.save(anotherUser);
    }

    public void updateUserAbout(String userId, String about) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
        user.setAbout(about);
        userRepository.save(user);
    }

    public void uploadProfileImage(String userId, byte[] imageBytes) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
        user.setProfileImage(imageBytes);
        userRepository.save(user);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
    }

    public List<String> getFollowingByUserId(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));

        return user.getFollowing();
    }
}
