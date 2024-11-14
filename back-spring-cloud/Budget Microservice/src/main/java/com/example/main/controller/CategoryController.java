package com.example.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.main.dto.CategoryWithSubcategoriesDTO;
import com.example.main.entities.Categorie;
import com.example.main.services.CategorieService;

import java.util.List;

@RestController
@RequestMapping("/budget")
public class CategoryController {

    @Autowired
    private CategorieService categorieService;

    @PostMapping("/categorie/create")
    public boolean createCategorie(@RequestBody Categorie categorie) {
        return categorieService.create(categorie);
    }

    @PutMapping("/categorie/update")
    public boolean updateCategorie(@RequestBody Categorie categorie) {
        return categorieService.update(categorie);
    }

    @DeleteMapping("/categorie/delete/{id}")
    public boolean deleteCategorie(@PathVariable int id) {
        return categorieService.delete(id);
    }

    @GetMapping("/categorie/all")
    public List<Categorie> findAllCategories() {
        return categorieService.findAll();
    }

    @GetMapping("/categorie/{id}")
    public Categorie getCategorieById(@PathVariable int id) {
        return categorieService.getById(id);
    }


    @GetMapping("/categorie/with-subcategories")
    public List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories() {
        return categorieService.getAllCategoriesWithSubcategories();
    }
}

