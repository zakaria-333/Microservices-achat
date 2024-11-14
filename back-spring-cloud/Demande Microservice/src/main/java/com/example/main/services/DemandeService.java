package com.example.main.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.main.dao.IDao;
import com.example.main.dto.JustificationWrapper;
import com.example.main.entities.Categorie;
import com.example.main.entities.Demande;
import com.example.main.entities.Demandeur;
import com.example.main.entities.Detail;
import com.example.main.entities.DetailKey;
import com.example.main.entities.Fournisseur;
import com.example.main.entities.Justification;
import com.example.main.entities.JustificationKey;
import com.example.main.entities.SubCategorie;
import com.example.main.entities.User;
import com.example.main.repository.DemandeRepo;
import com.example.main.repository.DetailRepo;
import com.example.main.repository.JustificationRepo;

import jakarta.transaction.Transactional;

@Service
public class DemandeService implements IDao<Demande, Integer> {
    @Autowired
    private DemandeRepo demandeRepo;

    @Autowired
    private DetailRepo detailRepo;
    @Autowired
    private JustificationRepo justificationRepo;

    @Override
    public boolean update(Demande demande) {
        if (demandeRepo.existsById(demande.getId())) {
            demandeRepo.save(demande);
            return true;
        }
        return false;
    }

    @Override
    public boolean create(Demande demande) {
        demandeRepo.save(demande);
        return true;
    }

    @Override
    public List<Demande> findAll() {
        return demandeRepo.findAll();
    }

    @Override
    public boolean delete(Integer id) {
        if (demandeRepo.existsById(id)) {
            demandeRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Demande getById(Integer id) {
        Optional<Demande> demande = demandeRepo.findById(id);
        return demande.orElse(null);
    }

    @Transactional
    public boolean createDemandeWithDetails(Demande demande, List<SubCategorie> subCategories) {
        Demande newDemande = demandeRepo.save(demande);
        for (SubCategorie subCategorie : subCategories) {
            DetailKey detailKey = new DetailKey(newDemande.getId(), subCategorie.getId());
            Detail detail = new Detail();
            detail.setId(detailKey);
            detail.setDemande(newDemande);
            detail.setSubCategorie(subCategorie);
            detailRepo.save(detail);
        }

        return true;

    }

    public List<Demande> findBySite(int id){
        return demandeRepo.findDemandesBySiteId(id);
    }

    public List<Demande> findByCategorie(Categorie categorie){


        return demandeRepo.findByCategorie(categorie);
    }

    public List<Demande> findByDemandeur(Demandeur demandeur){


        return demandeRepo.findByDemandeur(demandeur);
    }


    public Boolean validerDemande(Demande demande){
        demande.setConfirmationCd("validé");
        demandeRepo.save(demande);
        return true;
    }


    public boolean affecterMontantsADetails(Demande demande, List<Double> montants,Fournisseur fournisseur) {
        if (demande == null || montants == null) {
            throw new IllegalArgumentException("La demande et les montants ne peuvent pas être null");
        }
        List<Detail> details = demande.getDetails();
        if (details.size() < montants.size()) {
            throw new IllegalArgumentException("Il n'y a pas assez de détails pour affecter tous les montants");
        }
        double somme=0;
        for (int i = 0; i < montants.size(); i++) {

            Double montant = montants.get(i);
            somme=somme+montant;
            Detail detail = details.get(i);
            detail.setMontant(montant);
            detail.setDemande(demande);
            detailRepo.save(detail);
        }
        demande.setConfirmationAchat("validé");
        demande.setMontant(somme);
        demande.setFournisseur(fournisseur);
        demandeRepo.save(demande);
        

        return true;
    }
    public List<Demande> findDemandesBySiteIdAndConfirmationCdEncours(int id){
        return demandeRepo.findDemandesBySiteIdAndConfirmationCdEncours(id);
    }


    public List<Demande> findByConfirmationCd(String confirmation){
        return demandeRepo.findByConfirmationCd(confirmation);
    }

    public Boolean validerDemandeAchat(Demande demande){
        demande.setConfirmationAchat("validé");
        demandeRepo.save(demande);
        return true;
    }

    @Transactional
    public boolean addJustification(JustificationWrapper justificationWrapper) {
        User user = justificationWrapper.getUser();
        Demande demande = justificationWrapper.getDemande();

        if (user == null || user.getRole() == null || user.getRole().getNom() == null) {
            throw new IllegalArgumentException("Utilisateur ou rôle non renseigné");
        }

        String role = user.getRole().getNom();

        if (role.equals("ROLE_DS")) {
            demande.setConfirmationCd("refusé");
        } else if (role.equals("ROLE_ACHAT")) {
            demande.setConfirmationAchat("refusé");
        } else if (role.equals("ROLE_DAF")) {
            demande.setConfirmationDaf("refusé");
        } else if (role.equals("ROLE_DG")) {
            demande.setConfirmationDg("refusé");
        } else {
            throw new IllegalArgumentException("Rôle non reconnu: " + role);
        }

        JustificationKey justificationKey = new JustificationKey(user.getId(), demande.getId());
        Justification justification = new Justification(justificationKey, justificationWrapper.getDescription(),
                demande, user);

        demandeRepo.save(demande);
        justificationRepo.save(justification);

        return true;
    }

    public List<Demande> findByDemandeur(int id) {
        return demandeRepo.findByDemandeur_Id(id);
    }

    public List<Demande> getDemandesDaf() {
        return demandeRepo.findDemandesByConfirmationStatus("validé", "validé", "en cours", "en cours");
    }

    public List<Demande> getDemandesDg() {
        return demandeRepo.findDemandesByConfirmationStatus("validé", "validé", "validé", "en cours");
    }



    public List<Demande> findByConfirmationCdAndConfirmationAchat() {
        return demandeRepo.findByConfirmationCdAndConfirmationAchat("validé","en cours");
    }



}
