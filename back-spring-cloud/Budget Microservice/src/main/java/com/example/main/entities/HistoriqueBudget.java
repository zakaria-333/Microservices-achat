package com.example.main.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HistoriqueBudget {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String annee;
  private String subCategorie;
  private double montant;
}
