package com.example.main.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class Cd extends User{
  @JsonIgnore
  @OneToOne
  private Site site;
}
