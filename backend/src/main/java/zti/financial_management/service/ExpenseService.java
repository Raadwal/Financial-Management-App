package zti.financial_management.service;

import zti.financial_management.entity.ExpenseEntity;

import java.util.Date;
import java.util.List;

public interface ExpenseService {

    List<ExpenseEntity> findAllUserExpenses(String email);
    List<ExpenseEntity> findAllExpensesBetweenDates(Long categoryId, Date startDate, Date endDate);
    ExpenseEntity saveExpense(Long categoryId, ExpenseEntity expenseEntity);
    ExpenseEntity updateExpense(Long id, ExpenseEntity expenseEntity);
    void deleteExpense(Long expenseId);

}
