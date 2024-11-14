package com.example.main.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Demande {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String code;
  @Temporal(jakarta.persistence.TemporalType.DATE)
  private Date date;
  private double montant;
  private String Description;

  private String ConfirmationCd = "en cours"; 
  private String ConfirmationAchat = "en cours"; 
  private String ConfirmationDaf = "en cours"; 
  private String ConfirmationDg = "en cours";

  private String Proprietaire;
  @ManyToOne
  @JsonIgnore
  private Demandeur demandeur;
  @ManyToOne
  @JsonIgnore
  private Fournisseur fournisseur;
  @OneToMany(mappedBy = "demande", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Justification> justifications;
}
