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

import com.example.main.dto.JustificationWrapper;
import com.example.main.entities.Justification;
import com.example.main.entities.JustificationKey;
import com.example.main.services.JustificationService;

@RestController
@RequestMapping("/demande")
public class JustificationController {
    @Autowired
    private JustificationService justificationService;


   
    @PostMapping("/justification/cancel")
    public boolean createJustification(@RequestBody JustificationWrapper justificetionWrapper) {
        return justificationService.cancelJustification(justificetionWrapper.getDemande(),justificetionWrapper.getUser(),justificetionWrapper.getDescription());
    }

  
    @PutMapping("/justification/update")
    public boolean updateJustification(@RequestBody Justification justification) {
        return justificationService.update(justification);
    }

    
    @DeleteMapping("/justification/delete")
    public boolean deleteJustification(@RequestBody JustificationKey key) {
        return justificationService.delete(key);
    }

    
    @GetMapping("/justification/all")
    public List<Justification> findAllJustifications() {
        return justificationService.findAll();
    }

   
    @GetMapping("/justification/{userId}/{demandeId}")
    public Justification getJustificationById(@PathVariable int userId, @PathVariable int demandeId) {
        JustificationKey key = new JustificationKey(userId, demandeId);
        return justificationService.getById(key);
    }

    
}
