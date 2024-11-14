package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Categorie;

@Repository
public interface CategoryRepo extends JpaRepository <Categorie,Integer> {
    
}
