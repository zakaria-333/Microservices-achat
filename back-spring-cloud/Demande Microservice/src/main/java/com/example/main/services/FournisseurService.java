package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.main.dao.IDao;
import com.example.main.entities.Categorie;
import com.example.main.entities.Fournisseur;
import com.example.main.repository.FournisseurRepo;

@Service
public class FournisseurService implements IDao<Fournisseur,Integer> {
    @Autowired
    private FournisseurRepo fournisseurRepo;

    @Override
    public boolean update(Fournisseur fournisseur) {
        if (fournisseurRepo.existsById(fournisseur.getId())) {
            fournisseurRepo.save(fournisseur);
            return true;
        }
        return false;
    }

    @Override
    public boolean create(Fournisseur fournisseur) {
        fournisseurRepo.save(fournisseur);
        return true;
    }

    @Override
    public List<Fournisseur> findAll() {
        return fournisseurRepo.findAll();
    }

    @Override
    public boolean delete(Integer id) {
        if (fournisseurRepo.existsById(id)) {
            fournisseurRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Fournisseur getById(Integer id) {
        Optional<Fournisseur> fournisseur = fournisseurRepo.findById(id);
        return fournisseur.orElse(null);
    }


    public List<Fournisseur> findByCat(Categorie categorie){
        return fournisseurRepo.findByCategorie(categorie);
    }

}
