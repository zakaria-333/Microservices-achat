package com.example.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.main.dao.IDao;
import com.example.main.entities.Demande;
import com.example.main.entities.Detail;
import com.example.main.entities.SubCategorie;
import com.example.main.repository.SubCategoryRepo;
import java.util.List;
import java.util.Optional;

@Service
public class SubCategorieService implements IDao<SubCategorie> {

    @Autowired
    private SubCategoryRepo subCategoryRepo;

    @Autowired
    private CategorieService categorieService;

    @Override
    @Transactional
    public boolean create(SubCategorie subCategorie) {
        if (!subCategoryRepo.existsById(subCategorie.getId())) {
            subCategoryRepo.save(subCategorie);
            categorieService.updateCategoryBudget(subCategorie.getCategorie().getId());
            return true;
        }
        return false;
    }

    @Transactional
    public boolean processDemandeAndAdjustBudgets(Demande demande) {
        for (Detail detail : demande.getDetails()) {
            SubCategorie subCategorie = detail.getSubCategorie();
            double montant = detail.getMontant();

            subCategorie.setBudget(subCategorie.getBudget() - montant);

            subCategoryRepo.save(subCategorie);
        }
        categorieService.updateCategoryBudget(demande.getDetails().get(0).getSubCategorie().getCategorie().getId());
        return true;

    }

    @Override
    @Transactional
    public boolean update(SubCategorie subCategorie) {
        if (subCategoryRepo.existsById(subCategorie.getId())) {
            subCategoryRepo.save(subCategorie);
            categorieService.updateCategoryBudget(subCategorie.getCategorie().getId());
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean delete(int id) {
        Optional<SubCategorie> subCategorie = subCategoryRepo.findById(id);
        if (subCategorie.isPresent()) {
            int categoryId = subCategorie.get().getCategorie().getId();
            subCategoryRepo.deleteById(id);
            categorieService.updateCategoryBudget(categoryId);
            return true;
        }
        return false;
    }

    @Override
    public List<SubCategorie> findAll() {
        return subCategoryRepo.findAll();
    }

    @Override
    public SubCategorie getById(int id) {
        Optional<SubCategorie> subCategorie = subCategoryRepo.findById(id);
        return subCategorie.orElse(null);
    }


   
    public List<SubCategorie> getByCatId(int id) {
        
        return  subCategoryRepo.findByCategorieId(id);
    }
}