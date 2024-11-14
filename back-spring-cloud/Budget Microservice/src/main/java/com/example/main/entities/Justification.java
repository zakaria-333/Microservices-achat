package com.example.main.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Justification {
  @EmbeddedId
  private JustificationKey id;
  private String Description;
  @ManyToOne
  @JoinColumn(name="demande", referencedColumnName = "id", insertable = false, updatable = false)
  private Demande demande;
  @ManyToOne
  @JoinColumn(name="user", referencedColumnName = "id", insertable = false, updatable = false)
  private User user;
}
