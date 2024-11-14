package com.example.main.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class HistoriqueAjustement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String source;
  private String destination;
  private double montant;
  @Temporal(jakarta.persistence.TemporalType.DATE)
  private Date date;
}