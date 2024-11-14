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

import com.example.main.entities.Filiale;
import com.example.main.entities.Site;
import com.example.main.services.SiteService;

@RestController
@RequestMapping("/demande")
public class SiteController {
    @Autowired
    private SiteService siteService;

    @PostMapping("/site/create")
    public boolean createSite(@RequestBody Site site) {
        return siteService.create(site);
    }

    @PutMapping("/site/update")
    public boolean updateSite(@RequestBody Site site) {
        return siteService.update(site);
    }

    @DeleteMapping("/site/delete/{id}")
    public boolean deleteSite(@PathVariable int id) {
        return siteService.delete(id);
    }

    @GetMapping("/site/all")
    public List<Site> findAllSites() {
        return siteService.findAll();
    }

    @GetMapping("/site/{id}")
    public Site getSiteById(@PathVariable int id) {
        return siteService.getById(id);
    }

    @GetMapping("/site/noDs")
    public List<Site> getSiteWithourDs() {
        return siteService.getAllSitesWithoutDs();
    }


    @GetMapping("/site/byFiliale")
    public List<Site> findByFiliale(@RequestBody Filiale filiale) {
        return siteService.findByFiliale(filiale);
    }

    @GetMapping("/site/byVille/{ville}")
    public List<Site> findByVille(@PathVariable String ville) {
        return siteService.findByVille(ville);
    }
    
    
}
