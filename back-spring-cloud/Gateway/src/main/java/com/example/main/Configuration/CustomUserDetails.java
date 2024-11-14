package com.example.main.Configuration;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class CustomUserDetails implements UserDetails {
  private String username;
  private List<GrantedAuthority> authorities = new ArrayList<>();;

  public CustomUserDetails(String role, String username) {
    this.authorities.add(new SimpleGrantedAuthority(role));
    this.username = username;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return "mechkour";
  }

  @Override
  public String getUsername() {
    return username;
  }

}
