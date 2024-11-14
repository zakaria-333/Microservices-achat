package com.example.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.main.entities.SubCategorie;

@Repository
public interface SubCategoryRepo extends JpaRepository <SubCategorie,Integer> {
    @Query("SELECT SUM(s.budget) FROM SubCategorie s WHERE s.categorie.id = :categoryId")
    double sumBudgetsByCategoryId(int categoryId);
    SubCategorie findByNom(String nom);
    List<SubCategorie> findByCategorieId(int id);
}