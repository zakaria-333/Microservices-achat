package com.example.main.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.main.entities.User;
import com.example.main.repositories.UserRepository;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public String saveUser(User user) {
    user.setMdp(passwordEncoder.encode(user.getMdp()));
    userRepository.save(user);
    return "User registered successfully";
  }

  public String generateToken(String username, String role) {
    return jwtService.generateToken(username, role);
  }
}
