package com.example.main.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String token;
  @Temporal(jakarta.persistence.TemporalType.TIME)
  private Date date;
  private Boolean used;
  @ManyToOne
  private User user;
}
