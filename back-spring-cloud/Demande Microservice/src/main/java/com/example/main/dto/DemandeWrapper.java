package com.example.main.dto;

import java.util.List;

import com.example.main.entities.Demande;
import com.example.main.entities.SubCategorie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandeWrapper {

    private Demande demande;
    private List<SubCategorie> subCategories;
    
}
