package zti.financial_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import zti.financial_management.config.JwtService;
import zti.financial_management.entity.BudgetEntity;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.service.BudgetService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/categories")
public class BudgetController {

    private final BudgetService budgetService;
    private final JwtService jwtService;

    @GetMapping("/{categoryId}/budget")
    public List<BudgetEntity> findAllBudgets( @RequestHeader("Authorization") String token, @PathVariable("categoryId") Long categoryId) {
        return budgetService.findAllBudgets(categoryId);
    }

    @GetMapping("/{categoryId}/budget/{budgetId}")
    public BudgetEntity findBudgetById(@PathVariable("budgetId") Long budgetId, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return budgetService.findBudgetById(budgetId, email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
    }

    @PostMapping("/{categoryId}/budget")
    public BudgetEntity saveBudget(@PathVariable("categoryId") Long categoryId, @RequestBody BudgetEntity budgetEntity) {
        return budgetService.saveBudget(categoryId, budgetEntity);
    }

    @PutMapping("/{categoryId}/budget/{budgetId}")
    public BudgetEntity updateBudget(@PathVariable("budgetId") Long budgetId, @RequestBody BudgetEntity budgetEntity) {
        return budgetService.updateBudget(budgetId, budgetEntity);
    }

    @DeleteMapping("/{categoryId}/budget/{budgetId}")
    public void deleteBudget(@PathVariable("budgetId") Long budgetId) {
        budgetService.deleteBudget(budgetId);
    }
}
