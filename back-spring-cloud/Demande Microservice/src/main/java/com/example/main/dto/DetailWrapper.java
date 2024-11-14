package com.example.main.dto;

import java.util.List;

import com.example.main.entities.Demande;
import com.example.main.entities.Fournisseur;
import com.example.main.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailWrapper {



    private Demande demande;
    private List<Double> montants;
    private Fournisseur fournisseur;
    
}
