package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.main.dao.IDao;
import com.example.main.entities.Filiale;
import com.example.main.entities.Site;
import com.example.main.repository.SiteRepo;

@Service
public class SiteService implements IDao<Site,Integer> {

     @Autowired
    private SiteRepo siteRepo;

    @Override
    public boolean update(Site site) {
        if (siteRepo.existsById(site.getId())) {
            siteRepo.save(site);
            return true;
        }
        return false;
    }

    @Override
    public boolean create(Site site) {
        siteRepo.save(site);
        return true;
    }

    @Override
    public List<Site> findAll() {
        return siteRepo.findAll();
    }

    @Override
    public boolean delete(Integer id) {
        if (siteRepo.existsById(id)) {
            siteRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Site getById(Integer id) {
        Optional<Site> site = siteRepo.findById(id);
        return site.orElse(null);
    }

    public List<Site> getAllSitesWithoutDs(){
        return siteRepo.findSitesWithoutCd();   
    }
    public List<Site> findByFiliale(Filiale filiale){
        return siteRepo.findByFiliale(filiale);
    }
    public List<Site> findByVille(String ville){
        return siteRepo.findByVille(ville);
    }
    
}
