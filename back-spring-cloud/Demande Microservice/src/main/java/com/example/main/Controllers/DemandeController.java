package com.example.main.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.client.BudgetServiceClient;
import com.example.main.dto.ConfirmationWrapper;
import com.example.main.dto.DemandeWrapper;
import com.example.main.dto.DetailWrapper;
import com.example.main.dto.JustificationWrapper;
import com.example.main.entities.Categorie;
import com.example.main.entities.Demande;
import com.example.main.entities.Demandeur;
import com.example.main.entities.User;
import com.example.main.repository.DemandeRepo;
import com.example.main.services.DemandeService;


@RestController
@RequestMapping("/demande")
public class DemandeController {
    @Autowired
    private DemandeService demandeService;
    @Autowired
    private BudgetServiceClient budgetServiceClient;
    @Autowired
    private DemandeRepo demandeRepo;

    @PostMapping("/create")
    public boolean createDemande(@RequestBody DemandeWrapper demandeWrapper) {
        return demandeService.createDemandeWithDetails(demandeWrapper.getDemande(), demandeWrapper.getSubCategories());
    }

    @PutMapping("/update")
    public boolean updateDemande(@RequestBody Demande demande) {
        return demandeService.update(demande);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteDemande(@PathVariable int id) {
        return demandeService.delete(id);
    }

    @GetMapping("/all")
    public List<Demande> findAllDemandes() {
        return demandeService.findAll();
    }

    @GetMapping("/{id}")
    public Demande getDemandeById(@PathVariable int id) {
        return demandeService.getById(id);
    }

    @GetMapping("/demandeBySite/{id}")
    public List<Demande> getDemndeBySite(@PathVariable int id) {
        return demandeService.findBySite(id);
    }

    @GetMapping("/demandeBySiteEnCours/{id}")
    public List<Demande> findDemandesBySiteIdAndConfirmationCdEncours(@PathVariable int id) {
        return demandeService.findDemandesBySiteIdAndConfirmationCdEncours(id);
    }

    @GetMapping("/findByConfirmationCdAndConfirmationAchat")
    public List<Demande> findByConfirmationCdAndConfirmationAchat() {
        return demandeService.findByConfirmationCdAndConfirmationAchat();
    }

    @PostMapping("/validerDemande")
    public boolean validerDemande(@RequestBody Demande demande) {
        return demandeService.validerDemande(demande);
    }

    @PostMapping("/affecterMontant")
    public boolean afecterMontant(@RequestBody DetailWrapper detailWrapper) {
        return demandeService.affecterMontantsADetails(detailWrapper.getDemande(), detailWrapper.getMontants(),
                detailWrapper.getFournisseur());
    }

    @GetMapping("/demandeComfirmeCd")
    public List<Demande> findByConfirmationCd() {
        return demandeService.findByConfirmationCd("validé");
    }

    @PostMapping("/validerDemandeAchat")
    public boolean validerDemandeAchat(@RequestBody Demande demande) {
        return demandeService.validerDemande(demande);
    }

    @GetMapping("/all/{id}")
    public List<Demande> getDemandesByDemandeurId(@PathVariable int id) {
        return demandeService.findByDemandeur(id);
    }

    @GetMapping("/daf/filtered")
    public List<Demande> getDemandesDaf() {
        return demandeService.getDemandesDaf();
    }

    @GetMapping("/dg/filtered")
    public List<Demande> getDemandesDg() {
        return demandeService.getDemandesDg();
    }

    @PostMapping("/addJustification")
    public boolean addJustification(@RequestBody JustificationWrapper justificationWrapper) {
        return demandeService.addJustification(justificationWrapper);
    }

    @PostMapping("/confirm")
    public boolean postMethodName(@RequestBody ConfirmationWrapper confirmationWrapper) {
        Demande demande = confirmationWrapper.getDemande();
        User user = confirmationWrapper.getUser();
        String role = user.getRole().getNom();

        if (role.equals("ROLE_DS")) {
            demande.setConfirmationCd("validé");
        } else if (role.equals("ROLE_ACHAT")) {
            demande.setConfirmationAchat("validé");
        } else if (role.equals("ROLE_DAF")) {
            demande.setConfirmationDaf("validé");
        } else if (role.equals("ROLE_DG")) {
            demande.setConfirmationDg("validé");
            budgetServiceClient.subtractBudget(demande);
        } else {
            throw new IllegalArgumentException("Rôle non reconnu: " + role);
        }

        demandeRepo.save(demande);
        return true;
    }

    @PostMapping("/byCategorie")
    public List<Demande> findByCtegorie(@RequestBody Categorie categorie) {
        return demandeService.findByCategorie(categorie);
    }

    @PostMapping("/byDemandeur")
    public List<Demande> findByDemandeur(@RequestBody Demandeur demandeur) {
        return demandeService.findByDemandeur(demandeur);
    }

}
