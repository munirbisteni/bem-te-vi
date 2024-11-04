package com.bemtevi.bem_te_vi_api.controller;

import com.bemtevi.bem_te_vi_api.dto.LoginDTO;
import com.bemtevi.bem_te_vi_api.dto.SignupDTO;
import com.bemtevi.bem_te_vi_api.dto.TokenDTO;
import com.bemtevi.bem_te_vi_api.model.RefreshToken;
import com.bemtevi.bem_te_vi_api.model.User;
import com.bemtevi.bem_te_vi_api.repository.RefreshTokenRepository;
import com.bemtevi.bem_te_vi_api.repository.UserRepository;
import com.bemtevi.bem_te_vi_api.service.UserService;
import com.bemtevi.bem_te_vi_api.utils.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtHelper jwtHelper;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
        Authentication authentication = authenticateUser(dto.username(), dto.password());
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(generateTokenDTO(user));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO dto) {
        User user = new User(dto.username(), dto.displayName(), dto.email(), passwordEncoder.encode(dto.password()));
        userRepository.save(user);

        return ResponseEntity.ok(generateTokenDTO(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody TokenDTO dto) {
        validateAndDeleteRefreshToken(dto.refreshToken());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout-all")
    public ResponseEntity<?> logoutAll(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.refreshToken();
        if (validateRefreshToken(refreshTokenString)) {
            refreshTokenRepository.deleteByOwner_Id(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }

    @PostMapping("/access-token")
    public ResponseEntity<?> accessToken(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.refreshToken();
        if (validateRefreshToken(refreshTokenString)) {
            User user = userService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            String accessToken = jwtHelper.generateAccessToken(user);
            return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
        }

        throw new BadCredentialsException("invalid token");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.refreshToken();
        if (validateRefreshToken(refreshTokenString)) {
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            User user = userService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok(generateTokenDTO(user));
        }

        throw new BadCredentialsException("invalid token");
    }

    private Authentication authenticateUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    private TokenDTO generateTokenDTO(User user) {
        RefreshToken refreshToken = createAndSaveRefreshToken(user);
        String accessToken = jwtHelper.generateAccessToken(user);
        String refreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);
        return new TokenDTO(user.getId(), accessToken, refreshTokenString);
    }

    private RefreshToken createAndSaveRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setOwner(user);
        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    private boolean validateRefreshToken(String refreshTokenString) {
        return jwtHelper.validateRefreshToken(refreshTokenString) &&
                refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
    }

    private void validateAndDeleteRefreshToken(String refreshTokenString) {
        if (validateRefreshToken(refreshTokenString)) {
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
        } else {
            throw new BadCredentialsException("invalid token");
        }
    }

}
