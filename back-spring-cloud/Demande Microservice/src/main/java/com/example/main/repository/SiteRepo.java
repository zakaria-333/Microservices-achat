package com.example.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Filiale;
import com.example.main.entities.Site;

@Repository
public interface SiteRepo extends JpaRepository <Site,Integer> {

    @Query("SELECT s FROM Site s WHERE s.cd IS NULL")
    List<Site> findSitesWithoutCd();
    List<Site> findByFiliale(Filiale filiale);
    List<Site> findByVille(String ville);
    
}
