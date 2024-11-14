package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Detail;
import com.example.main.entities.DetailKey;


@Repository
public interface DetailRepo extends JpaRepository <Detail,DetailKey>   {
    
}
