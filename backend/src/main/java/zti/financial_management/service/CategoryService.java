package zti.financial_management.service;

import zti.financial_management.entity.CategoryEntity;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<CategoryEntity> findAllCategories(String email);
    Optional<CategoryEntity> findCategoryById(Long categoryId, String email);
    CategoryEntity saveCategory(String email, CategoryEntity categoryEntity);
    CategoryEntity updateCategory(Long id, CategoryEntity categoryEntity);
    void deleteCategory(Long id);

}
