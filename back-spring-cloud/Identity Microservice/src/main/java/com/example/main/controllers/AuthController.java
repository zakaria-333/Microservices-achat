package com.example.main.controllers;

import com.example.main.configuration.CustomUserDetails;
import com.example.main.dto.AuthRequestDto;
import com.example.main.dto.AuthResponseDto;
import com.example.main.dto.EmailDto;
import com.example.main.dto.PasswordDto;
import com.example.main.dto.TokenDto;
import com.example.main.entities.User;
import com.example.main.repositories.UserRepository;
import com.example.main.services.AuthService;
import com.example.main.services.EmailService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EmailService emailService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @PostMapping("/login")
  public AuthResponseDto login(@RequestBody AuthRequestDto authRequestDto) throws Exception {
    User user = null;
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(authRequestDto.getUsername(), authRequestDto.getMdp()));

    if (authentication.isAuthenticated()) {
      CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
      user = userDetails.getUser();
      String token = authService.generateToken(authRequestDto.getUsername(), user.getRole().getNom());
      return new AuthResponseDto(user, token);
    } else {
      throw new Exception("Invalid Access");
    }
  }

  @PostMapping("/email-validation")
  public Boolean verifyEmail(@RequestBody EmailDto emailDto) {
    return userRepository.existsUserByEmail(emailDto.getEmail());
  }

  @PostMapping("/send-token")
  public boolean sendToken(@RequestBody TokenDto tokenDto) {
    try {
      emailService.sendEmail(
          tokenDto.getEmail(),
          "Code de vérification pour la récupération du mot de passe",
          "Votre code de vérification est " + tokenDto.getToken());
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @PostMapping("/update-password")
  public boolean updatePassword(@RequestBody PasswordDto passwordDto) {
    Optional<User> optionalUser = userRepository.findByEmail(passwordDto.getEmail());

    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      user.setMdp(passwordEncoder.encode(passwordDto.getPassword()));
      userRepository.save(user);
      return true;
    } else {
      return false;
    }
  }

}
