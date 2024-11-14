package com.example.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.main.entities.Demande;
import com.example.main.entities.SubCategorie;
import com.example.main.services.SubCategorieService;

import java.util.List;

@RestController
@RequestMapping("/budget")
public class SubCategorieController {

    @Autowired
    private SubCategorieService subCategorieService;

    @PostMapping("/subcategorie/create")
    public boolean createSubCategorie(@RequestBody SubCategorie subCategorie) {
        return subCategorieService.create(subCategorie);
    }

    @PutMapping("/subcategorie/update")
    public boolean updateSubCategorie(@RequestBody SubCategorie subCategorie) {
        return subCategorieService.update(subCategorie);
    }

    @DeleteMapping("/subcategorie/delete/{id}")
    public boolean deleteSubCategorie(@PathVariable int id) {
        return subCategorieService.delete(id);
    }

    @GetMapping("/subcategorie/all")
    public List<SubCategorie> findAllSubCategories() {
        return subCategorieService.findAll();
    }

    @GetMapping("/subcategorie/{id}")
    public SubCategorie getSubCategorieById(@PathVariable int id) {
        return subCategorieService.getById(id);
    }
    @PostMapping("/subcategorie/subtract")
    public boolean postMethodName(@RequestBody Demande demande) {
        return subCategorieService.processDemandeAndAdjustBudgets(demande);
    }



    @GetMapping("/subcategorie/category/{id}")
    public List<SubCategorie> getSubCategorirByCategorieId(@PathVariable int id) {
        return subCategorieService.getByCatId(id);
    }
}
