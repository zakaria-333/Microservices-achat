package com.example.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Demandeur;

@Repository
public interface DemandeurRepo extends JpaRepository<Demandeur, Integer>{
    List<Demandeur> findBySiteId(int id);
  
}
