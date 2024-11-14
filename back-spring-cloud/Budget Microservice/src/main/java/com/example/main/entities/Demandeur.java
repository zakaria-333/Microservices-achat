package com.example.main.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Demandeur extends User {
  @ManyToOne
  private Site site;

  @OneToMany(mappedBy = "demandeur", fetch = FetchType.LAZY)
  private List<Demande> demandes;

  public Site getSite() {
    return site;
  }

  public void setSite(Site site) {
    this.site = site;
  }

  public List<Demande> getDemandes() {
    return demandes;
  }

  public void setDemandes(List<Demande> demandes) {
    this.demandes = demandes;
  }
}
