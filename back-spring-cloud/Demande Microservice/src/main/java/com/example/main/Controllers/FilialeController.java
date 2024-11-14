package com.example.main.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.entities.Categorie;
import com.example.main.entities.Filiale;
import com.example.main.services.FilialeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/demande")
public class FilialeController {
    @Autowired
    private FilialeService filialeService;

    @PostMapping("/filiale/create")
    public boolean createFiliale(@RequestBody Filiale filiale){
        return filialeService.create(filiale);
    }

    @PutMapping("/filiale/update")
    public boolean updateFiliale(@RequestBody Filiale filiale){
        return filialeService.update(filiale);

    }

    @DeleteMapping("/filiale/delete/{id}")
    public boolean deleteFiliale(@PathVariable int id){
        return filialeService.delete(id);
    }

    @GetMapping("/filiale/all")
    public List<Filiale> findAllFiliale() {
        return filialeService.findAll();
    }

    @GetMapping("/filiale/{id}")
    public Filiale getFilialeById(@PathVariable int id){
        return filialeService.getById(id);
    }

    
    }
    
    






    
    
    

