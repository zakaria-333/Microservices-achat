package com.example.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.main.dao.IDao;
import com.example.main.dto.CategoryWithSubcategoriesDTO;
import com.example.main.entities.Categorie;
import com.example.main.repository.CategoryRepo;
import com.example.main.repository.SubCategoryRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategorieService implements IDao<Categorie> {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private SubCategoryRepo subCategoryRepo;

    @Override
    public boolean create(Categorie categorie) {
        if (!categoryRepo.existsById(categorie.getId())) {
            categoryRepo.save(categorie);
            return true;
        }
        return false;
    }

    @Override
    public boolean update(Categorie categorie) {
        if (categoryRepo.existsById(categorie.getId())) {
            categoryRepo.save(categorie);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (categoryRepo.existsById(id)) {
            categoryRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Categorie> findAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Categorie getById(int id) {
        Optional<Categorie> categorie = categoryRepo.findById(id);
        return categorie.orElse(null);
    }

    @Transactional
    public void updateCategoryBudget(int categoryId) {
        Categorie categorie = categoryRepo.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
        double totalBudget = subCategoryRepo.sumBudgetsByCategoryId(categoryId);
        categorie.setBudget(totalBudget);
        categoryRepo.save(categorie);
    }

    public List<CategoryWithSubcategoriesDTO> getAllCategoriesWithSubcategories() {
        List<Categorie> categories = categoryRepo.findAll();
        return categories.stream()
                .map(CategoryWithSubcategoriesDTO::new)
                .collect(Collectors.toList());
    }
}

