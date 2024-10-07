package zti.financial_management.service.implementation;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zti.financial_management.entity.BudgetEntity;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.repository.BudgetRepository;
import zti.financial_management.repository.CategoryRepository;
import zti.financial_management.repository.ExpenseRepository;
import zti.financial_management.service.BudgetService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BudgetServiceImplementation implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;

    @Override
    public List<BudgetEntity> findAllBudgets(Long categoryId) {
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        return budgetRepository.findByCategory(category);
    }

    @Override
    public Optional<BudgetEntity> findBudgetById(Long budgetId, String email) {
        BudgetEntity budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + budgetId)
                );

        if(budget.getCategory().getUser() != null && email.equals(budget.getCategory().getUser().getEmail())) {
            return  Optional.of(budget);
        } else {
            throw new RuntimeException("Budget with id: " + budgetId + " does not belong to user with email: " + email);
        }
    }

    @Override
    @Transactional
    public BudgetEntity saveBudget(Long categoryId, BudgetEntity budgetEntity) {
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        budgetEntity.setCategory(category);

        Float amount = expenseRepository.findSumOfExpensesInDateRange(categoryId, budgetEntity.getStartDate(), budgetEntity.getEndDate());

        if(amount == null) {
            budgetEntity.setCurrentAmount(0.0f);
        } else {
            budgetEntity.setCurrentAmount(amount);
        }

        return budgetRepository.save(budgetEntity);
    }

    @Override
    @Transactional
    public BudgetEntity updateBudget(Long id, BudgetEntity budgetEntity) {
        BudgetEntity existingBudget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + budgetEntity.getId()));

        existingBudget.setTargetAmount(budgetEntity.getTargetAmount());
        existingBudget.setStartDate(budgetEntity.getStartDate());
        existingBudget.setEndDate(budgetEntity.getEndDate());

        Float amount = expenseRepository.findSumOfExpensesInDateRange(existingBudget.getCategory().getId(),
                                                existingBudget.getStartDate(), existingBudget.getEndDate());

        existingBudget.setCurrentAmount(amount);

        if(amount == null) {
            budgetEntity.setCurrentAmount(0.0f);
        } else {
            budgetEntity.setCurrentAmount(amount);
        }

        return budgetRepository.save(existingBudget);
    }

    @Override
    @Transactional
    public void deleteBudget(Long budgetId) {
        BudgetEntity budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + budgetId));

        budget.setCategory(null);

        budgetRepository.deleteById(budgetId);
    }

}
