package zti.financial_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import zti.financial_management.config.JwtService;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.service.CategoryService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final JwtService jwtService;

    @GetMapping
    public List<CategoryEntity> findAllCategories(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return categoryService.findAllCategories(email);
    }

    @GetMapping("/{categoryId}")
    public CategoryEntity findCategoryById(@PathVariable("categoryId") Long categoryId, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return categoryService.findCategoryById(categoryId, email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    }

    @PostMapping
    public CategoryEntity saveCategory(@RequestHeader("Authorization") String token, @RequestBody CategoryEntity categoryEntity) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return categoryService.saveCategory(email, categoryEntity);
    }

    @PutMapping("/{categoryId}")
    public CategoryEntity updateCategory(@PathVariable("categoryId") Long categoryId, @RequestBody CategoryEntity categoryEntity) {
        return categoryService.updateCategory(categoryId, categoryEntity);
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}
