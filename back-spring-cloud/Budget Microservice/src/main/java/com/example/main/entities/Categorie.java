package com.example.main.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Categorie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String nom;
  private double budget;
  private String code;
  @JsonIgnore
  @OneToMany(mappedBy = "categorie", fetch = FetchType.LAZY)
  private List<Fournisseur> fournisseurs;
  @JsonIgnore
  @OneToMany(mappedBy = "categorie", fetch = FetchType.LAZY)
  private List<SubCategorie> subCategories;
}
