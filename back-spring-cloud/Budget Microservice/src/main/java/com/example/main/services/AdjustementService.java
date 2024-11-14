package com.example.main.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.main.dao.IDao;
import com.example.main.entities.HistoriqueAjustement;
import com.example.main.entities.SubCategorie;
import com.example.main.repository.AdjustementRepo;
import com.example.main.repository.SubCategoryRepo;

@Service
public class AdjustementService implements IDao<HistoriqueAjustement> {
    @Autowired
    private AdjustementRepo adjustementRepo;

    @Autowired
    private SubCategoryRepo subCategoryRepo;

    @Autowired
    private CategorieService categorieService;

    @Transactional
    public boolean transferBudget(HistoriqueAjustement historiqueAjustement) {
        SubCategorie source = subCategoryRepo.findByNom(historiqueAjustement.getSource());
        SubCategorie destination = subCategoryRepo.findByNom(historiqueAjustement.getDestination());

        Date today = new Date();
        historiqueAjustement.setDate(today);



        if (source == null || destination == null) {
            throw new RuntimeException("Source or destination subcategory not found");
        }

        if (source.getBudget() < historiqueAjustement.getMontant()) {
            throw new RuntimeException("Budget insuffisant dans la sous-catégorie source");
        }

        source.setBudget(source.getBudget() - historiqueAjustement.getMontant());
        destination.setBudget(destination.getBudget() + historiqueAjustement.getMontant());

        subCategoryRepo.save(source);
        subCategoryRepo.save(destination);

        categorieService.updateCategoryBudget(source.getCategorie().getId());
        categorieService.updateCategoryBudget(destination.getCategorie().getId());

        create(historiqueAjustement);

        return true;
    }

    @Override
    public boolean update(HistoriqueAjustement o) {
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public List<HistoriqueAjustement> findAll() {
        return adjustementRepo.findAll();
    }

    @Override
    public HistoriqueAjustement getById(int id) {
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public boolean create(HistoriqueAjustement historiqueAjustement) {
        if (!adjustementRepo.existsById(historiqueAjustement.getId())) {
            adjustementRepo.save(historiqueAjustement);
            return true;
        }
        return false;
    }

}