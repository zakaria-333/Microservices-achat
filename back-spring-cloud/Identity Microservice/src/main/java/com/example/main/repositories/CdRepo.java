package com.example.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Cd;

@Repository
public interface CdRepo extends JpaRepository <Cd, Integer>{
  
}
