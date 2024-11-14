package com.example.main.configuration;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.main.entities.*;



public class CustomUserDetails implements UserDetails {

  private String username;
  private String mdp;
  private User user;

  public CustomUserDetails (User u){
    this.username = u.getUsername();
    this.user = u;
    this.mdp = u.getMdp();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return mdp;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public User getUser(){
    return user;
  }

}
