package zti.financial_management.service.implementation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.entity.UserEntity;
import zti.financial_management.repository.CategoryRepository;
import zti.financial_management.repository.UserRepository;
import zti.financial_management.service.CategoryService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CategoryServiceImplementation implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public List<CategoryEntity> findAllCategories(String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with email: " + email)
        );

        return user.getUserCategories();
    }

    @Override
    public Optional<CategoryEntity> findCategoryById(Long categoryId, String email) {
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId)
                );

        if(category.getUser() != null && email.equals(category.getUser().getEmail())) {
            return  Optional.of(category);
        } else {
            throw new RuntimeException("Category with id: " + categoryId + " does not belong to user with email: " + email);
        }
    }

    @Override
    @Transactional
    public CategoryEntity saveCategory(String email, CategoryEntity categoryEntity) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with email: " + email)
        );

        categoryEntity.setUser(user);

        return categoryRepository.save(categoryEntity);
    }

    @Override
    @Transactional
    public CategoryEntity updateCategory(Long id, CategoryEntity categoryEntity) {
        CategoryEntity existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryEntity.getId()));

        existingCategory.setDescription(categoryEntity.getDescription());

        return categoryRepository.save(existingCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        CategoryEntity existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        existingCategory.setUser(null);
        categoryRepository.save(existingCategory);
        categoryRepository.deleteById(id);
    }
}
