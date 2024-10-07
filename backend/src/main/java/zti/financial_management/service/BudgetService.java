package zti.financial_management.service;

import zti.financial_management.entity.BudgetEntity;

import java.util.List;
import java.util.Optional;

public interface BudgetService {

    List<BudgetEntity> findAllBudgets(Long categoryId);
    Optional<BudgetEntity> findBudgetById(Long budgetId, String email);
    BudgetEntity saveBudget(Long categoryId, BudgetEntity budgetEntity);
    BudgetEntity updateBudget(Long id, BudgetEntity budgetEntity);
    void deleteBudget(Long budgetId);
}
