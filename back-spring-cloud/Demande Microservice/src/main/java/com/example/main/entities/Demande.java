package com.example.main.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
  private String description;
  private String confirmationCd="en cours";
  private String confirmationAchat="en cours";
  private String confirmationDaf="en cours";
  private String confirmationDg="en cours";
  private String proprietaire;
  @ManyToOne
  private Demandeur demandeur;
  @ManyToOne
  private Fournisseur fournisseur;
  @OneToMany(mappedBy = "demande", fetch = FetchType.LAZY)
  private List<Justification> justifications;
  @OneToMany(mappedBy = "demande" ,fetch = FetchType.EAGER)
  private List<Detail> details;
}
