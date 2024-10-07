package zti.financial_management.service.implementation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.entity.ExpenseEntity;
import zti.financial_management.repository.BudgetRepository;
import zti.financial_management.repository.CategoryRepository;
import zti.financial_management.repository.ExpenseRepository;
import zti.financial_management.service.ExpenseService;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class ExpenseServiceImplementation implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetRepository budgetRepository;

    @Override
    public List<ExpenseEntity> findAllUserExpenses(String email) {
        return expenseRepository.findAllByUserEmail(email);
    }

    @Override
    public List<ExpenseEntity> findAllExpensesBetweenDates(Long categoryId, Date startDate, Date endDate) {
        return expenseRepository.findAllByUserEmailAndDateBetween(categoryId, startDate, endDate);
    }

    @Override
    @Transactional
    public ExpenseEntity saveExpense(Long categoryId, ExpenseEntity expenseEntity) {
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        expenseEntity.setCategory(category);

        budgetRepository.updateBudgetAmount(expenseEntity.getAmount(), categoryId, expenseEntity.getDate());

        return expenseRepository.save(expenseEntity);
    }

    @Override
    @Transactional
    public ExpenseEntity updateExpense(Long id, ExpenseEntity expenseEntity) {
        ExpenseEntity existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + expenseEntity.getId()));

        existingExpense.setAmount(expenseEntity.getAmount());
        existingExpense.setDescription(expenseEntity.getDescription());
        existingExpense.setDate(expenseEntity.getDate());

        Float amountAdded = (expenseEntity.getAmount() - existingExpense.getAmount());

        budgetRepository.updateBudgetAmount(amountAdded, existingExpense.getCategory().getId(), existingExpense.getDate());

        return expenseRepository.save(existingExpense);
    }

    @Override
    @Transactional
    public void deleteExpense(Long expenseId) {
        ExpenseEntity expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + expenseId));

        budgetRepository.updateBudgetAmount(-expense.getAmount(), expense.getCategory().getId(), expense.getDate());

        expense.setCategory(null);

        expenseRepository.deleteById(expenseId);
    }
}
