package com.example.main.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Cd extends User{
  @OneToOne
  private Site site;

  public Site getSite() {
    return site;
  }

  public void setSite(Site site) {
    this.site = site;
  }
  
}
