package com.example.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.main.entities.Categorie;
import com.example.main.entities.Demande;
import com.example.main.entities.Demandeur;

@Repository
public interface DemandeRepo extends JpaRepository<Demande, Integer> {
    @Query("SELECT d FROM Demande d WHERE d.demandeur.site.id = :siteId")
    List<Demande> findDemandesBySiteId(@Param("siteId") int siteId);

    @Query("SELECT d FROM Demande d WHERE d.demandeur.site.id = :siteId AND d.confirmationCd = 'en cours'")
    List<Demande> findDemandesBySiteIdAndConfirmationCdEncours(@Param("siteId") int siteId);

    List<Demande> findByConfirmationCd(String confirmationCd);
    List<Demande> findByDemandeur(Demandeur demandeur);

    List<Demande> findByDemandeur_Id(int id);
    @Query("SELECT d FROM Demande d WHERE d.fournisseur.categorie = :categorie")
    List<Demande> findByCategorie(@Param("categorie") Categorie categorie);
  

    @Query("SELECT d FROM Demande d WHERE d.confirmationCd = :confirmationCd AND d.confirmationAchat = :confirmationAchat AND d.confirmationDaf = :confirmationDaf AND d.confirmationDg = :confirmationDg")
    List<Demande> findDemandesByConfirmationStatus(
            @Param("confirmationCd") String confirmationCd,
            @Param("confirmationAchat") String confirmationAchat,
            @Param("confirmationDaf") String confirmationDaf,
            @Param("confirmationDg") String confirmationDg);

    List<Demande> findByConfirmationCdAndConfirmationAchat(String confirmationCd,String confirmationAchat);

}
