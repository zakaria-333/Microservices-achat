package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.main.dao.IDao;
import com.example.main.entities.Filiale;
import com.example.main.repository.FilialeRepo;

@Service
public class FilialeService implements IDao<Filiale,Integer> {
    @Autowired
    private FilialeRepo filialeRepo;

    @Override
    public boolean update(Filiale filiale) {
        if (filialeRepo.existsById(filiale.getId())) {
            filialeRepo.save(filiale);
            return true;
        }
        return false;
    }

    @Override
    public boolean create(Filiale filiale) {
        filialeRepo.save(filiale);
        return true;
    }

    @Override
    public List<Filiale> findAll() {
        return filialeRepo.findAll();
    }

    @Override
    public boolean delete(Integer id) {
        if (filialeRepo.existsById(id)) {
            filialeRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Filiale getById(Integer id) {
        Optional<Filiale> filiale = filialeRepo.findById(id);
        return filiale.orElse(null);
    }

}
