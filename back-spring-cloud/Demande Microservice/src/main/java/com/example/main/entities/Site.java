package com.example.main.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Site {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String nom;
  private String code;
  private String ville;
  
  @OneToMany(mappedBy = "site", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Demandeur> Demandeurs;
  @JsonIgnore
  @OneToOne(mappedBy = "site")
  private Cd cd;
  @ManyToOne
  private Filiale filiale;
}
