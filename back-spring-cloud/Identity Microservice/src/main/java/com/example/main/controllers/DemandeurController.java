package com.example.main.controllers;

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

import com.example.main.entities.Demandeur;
import com.example.main.services.DemandeurService;

@RestController
@RequestMapping("/user")
public class DemandeurController {

    @Autowired
    private DemandeurService demandeurService;

    @PostMapping("/demandeur/create")
    public boolean createDemandeur(@RequestBody Demandeur demandeur) {
        return demandeurService.create(demandeur);
    }

    @PutMapping("/demandeur/update")
    public Demandeur updateDemandeur(@RequestBody Demandeur demandeur) {
        return demandeurService.update(demandeur);
    }

    @DeleteMapping("/demandeur/delete/{id}")
    public boolean deleteDemandeur(@PathVariable int id) {
        return demandeurService.delete(id);
    }

    @GetMapping("/demandeur/all")
    public List<Demandeur> findAllDemandeurs() {
        return demandeurService.findAll();
    }

    @GetMapping("/demandeur/{id}")
    public Demandeur getDemandeurById(@PathVariable int id) {
        return demandeurService.getById(id);
    }
    @GetMapping("/demandeurBySite/{id}")
    public List<Demandeur> getDemandeurBySite(@PathVariable int id) {
        return demandeurService.getBySite(id);
    }
}