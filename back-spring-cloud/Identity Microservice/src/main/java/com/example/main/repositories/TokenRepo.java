package com.example.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Token;

@Repository
public interface TokenRepo extends JpaRepository<Token, Integer>{
  
}
