package com.example.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Categorie;
import com.example.main.entities.Fournisseur;
import java.util.List;


@Repository
public interface FournisseurRepo extends JpaRepository <Fournisseur,Integer> {

    public List<Fournisseur> findByCategorie(Categorie categorie);
    
}
