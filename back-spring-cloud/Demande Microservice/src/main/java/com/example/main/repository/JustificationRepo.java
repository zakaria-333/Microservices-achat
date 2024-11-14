package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Justification;
import com.example.main.entities.JustificationKey;

@Repository
public interface JustificationRepo extends JpaRepository <Justification,JustificationKey> {
    
}
