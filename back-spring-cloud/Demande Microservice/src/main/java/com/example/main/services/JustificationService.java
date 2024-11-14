package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.main.dao.IDao;
import com.example.main.entities.Justification;
import com.example.main.entities.Demande;
import com.example.main.entities.User;
import com.example.main.entities.JustificationKey;
import com.example.main.repository.DemandeRepo;
import com.example.main.repository.JustificationRepo;

@Service
public class JustificationService implements IDao<Justification, JustificationKey> {

    @Autowired
    private JustificationRepo justificationRepo;
    @Autowired
    private DemandeRepo  demandeRepo;

    @Override
    public boolean update(Justification justification) {
        if (justificationRepo.existsById(justification.getId())) {
            justificationRepo.save(justification);
            return true;
        }
        return false;
    }

    @Override
    public boolean create(Justification justification) {
        justificationRepo.save(justification);
        return true;
    }

    @Override
    public List<Justification> findAll() {
        return justificationRepo.findAll();
    }

    @Override
    public boolean delete(JustificationKey id) {
        if (justificationRepo.existsById(id)) {
            justificationRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Justification getById(JustificationKey id) {
        Optional<Justification> justification = justificationRepo.findById(id);
        return justification.orElse(null);
    }

    @Transactional
    public boolean cancelJustification(Demande demande, User user, String description) {
        String role=user.getRole().getNom();
        if (role.equals("ROLE_DS")) {
            demande.setConfirmationCd("refusé");
        } else if (role.equals("ROLE_ACHAT")) {
            demande.setConfirmationAchat("refusé");
        } else if (role.equals("ROLE_DAF")) {
            demande.setConfirmationDaf("refusé");
        } else if (role.equals("ROLE_DG")) {
            demande.setConfirmationDg("refusé");
        } 
        JustificationKey justificationKey = new JustificationKey(user.getId(), demande.getId());
        Justification justification = new Justification(justificationKey,description,demande,user);
        justificationRepo.save(justification);
        demandeRepo.save(demande);
        
        return true;
    }
}
