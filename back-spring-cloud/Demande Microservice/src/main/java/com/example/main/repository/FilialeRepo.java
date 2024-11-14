package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Filiale;

@Repository
public interface FilialeRepo extends JpaRepository <Filiale,Integer> {
    
}
