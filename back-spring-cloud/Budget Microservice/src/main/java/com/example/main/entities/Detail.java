package com.example.main.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class Detail {
    @EmbeddedId
    private DetailKey id;
    private double montant;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "demande", referencedColumnName = "id")
    private Demande demande;
    @ManyToOne
    @JoinColumn(name = "subCategorie", referencedColumnName = "id")
    private SubCategorie subCategorie;

}
