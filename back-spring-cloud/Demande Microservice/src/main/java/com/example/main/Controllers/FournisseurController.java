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

import com.example.main.entities.Categorie;
import com.example.main.entities.Filiale;
import com.example.main.entities.Fournisseur;
import com.example.main.services.FournisseurService;

@RestController
@RequestMapping("/demande")
public class FournisseurController {
    @Autowired
    private FournisseurService fournisseurService;

    @PostMapping("/fournisseur/create")
    public boolean createFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.create(fournisseur);
    }

    @PutMapping("/fournisseur/update")
    public boolean updateFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.update(fournisseur);
    }

    @DeleteMapping("/fournisseur/delete/{id}")
    public boolean deleteFournisseur(@PathVariable int id) {
        return fournisseurService.delete(id);
    }

    @GetMapping("/fournisseur/all")
    public List<Fournisseur> findAllFournisseurs() {
        return fournisseurService.findAll();
    }

    @GetMapping("/fournisseur/{id}")
    public Fournisseur getFournisseurById(@PathVariable int id) {
        return fournisseurService.getById(id);
    }

    @PostMapping("/fournisseur/ByCat")
    public List<Fournisseur> findByCat(@RequestBody Categorie categorie){
        return fournisseurService.findByCat(categorie);
    }
     
}
