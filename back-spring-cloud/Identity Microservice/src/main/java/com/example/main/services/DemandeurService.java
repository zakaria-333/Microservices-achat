package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.main.repositories.DemandeurRepo;
import com.example.main.dao.IDao;
import com.example.main.entities.Demandeur;

@Service
public class DemandeurService implements IDao<Demandeur> {

    @Autowired
    private DemandeurRepo demandeurRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Demandeur update(Demandeur demandeur) {
        if (demandeurRepo.existsById(demandeur.getId())) {
            demandeurRepo.save(demandeur);
            return demandeur;
        }
        return demandeur;
    }

    @Override
    public boolean create(Demandeur demandeur) {
        if (!demandeurRepo.existsById(demandeur.getId())) {
            demandeur.setMdp(passwordEncoder.encode(demandeur.getMdp()));
            demandeurRepo.save(demandeur);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (demandeurRepo.existsById(id)) {
            demandeurRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Demandeur> findAll() {
        return demandeurRepo.findAll();
    }

    @Override
    public Demandeur getById(int id) {
        Optional<Demandeur> demandeur = demandeurRepo.findById(id);
        return demandeur.orElse(null);
    }

    
    public List<Demandeur> getBySite(int id) {
        return demandeurRepo.findBySiteId(id);
    }
}