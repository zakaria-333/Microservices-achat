package com.example.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.entities.HistoriqueAjustement;
import com.example.main.services.AdjustementService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/budget")
public class AdjustementController {
    @Autowired
    private AdjustementService adjustementService;

    @PostMapping("/ajustement")
    public boolean ajustement(@RequestBody HistoriqueAjustement historiqueAjustement) {
        return adjustementService.transferBudget(historiqueAjustement);
    }

    @GetMapping("/historique-ajustement")
    public List<HistoriqueAjustement> GetHistorique() {
        return adjustementService.findAll();
    }
    
}