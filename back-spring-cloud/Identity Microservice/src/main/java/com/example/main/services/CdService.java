package com.example.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.main.repositories.CdRepo;
import com.example.main.dao.IDao;
import com.example.main.entities.Cd;
import com.example.main.entities.Demandeur;
import com.example.main.entities.User;

import java.util.List;
import java.util.Optional;

@Service
public class CdService implements IDao<Cd> {

    @Autowired
    private CdRepo cdRepo;

    @Autowired PasswordEncoder passwordEncoder;

    @Override
    public boolean create(Cd cd) {
        if (!cdRepo.existsById(cd.getId())) {
            cd.setMdp(passwordEncoder.encode(cd.getMdp()));
            cdRepo.save(cd);
            return true;
        }
        return false;
    }

    @Override
    public Cd update(Cd cd) {
        if (cdRepo.existsById(cd.getId())) {
            cdRepo.save(cd);
            return cd;
        }
        return cd;
    }

    @Override
    public boolean delete(int id) {
        if (cdRepo.existsById(id)) {
            cdRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Cd> findAll() {
        return cdRepo.findAll();
    }

    @Override
    public Cd getById(int id) {
        Optional<Cd> cd = cdRepo.findById(id);
        return cd.orElse(null);
    }
}
