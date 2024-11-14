package com.example.main.dto;

import java.util.List;

import com.example.main.entities.Categorie;
import com.example.main.entities.SubCategorie;

import lombok.Data;

@Data
public class CategoryWithSubcategoriesDTO {

    private int id;
    private String nom;
    private Double budget;
    private List<SubCategorie> subCategories;

    public CategoryWithSubcategoriesDTO(Categorie category) {
        this.id = category.getId();
        this.nom = category.getNom();
        this.budget=category.getBudget();
        this.subCategories = category.getSubCategories();

    }
}
