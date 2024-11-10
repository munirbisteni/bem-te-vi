package com.bemtevi.bem_te_vi_api.service;

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
