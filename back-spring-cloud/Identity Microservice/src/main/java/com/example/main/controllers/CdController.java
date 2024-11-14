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

import com.example.main.entities.Cd;
import com.example.main.services.CdService;

@RestController
@RequestMapping("/user")
public class CdController {

    @Autowired
    private CdService cdService;

    @PostMapping("/ds/create")
    public boolean createCd(@RequestBody Cd cd) {
        return cdService.create(cd);
    }

    @PutMapping("/ds/update")
    public Cd updateCd(@RequestBody Cd cd) {
        return cdService.update(cd);
    }

    @DeleteMapping("/ds/delete/{id}")
    public boolean deleteCd(@PathVariable int id) {
        return cdService.delete(id);
    }

    @GetMapping("/ds/all")
    public List<Cd> findAllCds() {
        return cdService.findAll();
    }

    @GetMapping("/ds/{id}")
    public Cd getCdById(@PathVariable int id) {
        return cdService.getById(id);
    }
}
