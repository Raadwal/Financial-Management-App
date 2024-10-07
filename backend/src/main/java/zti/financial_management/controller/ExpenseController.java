package zti.financial_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import zti.financial_management.config.JwtService;
import zti.financial_management.entity.ExpenseEntity;
import zti.financial_management.service.ExpenseService;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final JwtService jwtService;

    @GetMapping("/expenses")
    public List<ExpenseEntity> findAllUserExpenses(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return expenseService.findAllUserExpenses(email);
    }

    @GetMapping("/categories/{categoryId}/expenses/filter")
    public List<ExpenseEntity> getAllExpensesByUserEmailAndDateBetween(
            @PathVariable("categoryId") Long categoryId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

        return expenseService.findAllExpensesBetweenDates(categoryId, startDate, endDate);
    }

    @PostMapping("/categories/{categoryId}/expense")
    public ExpenseEntity saveExpense(@PathVariable("categoryId") Long categoryId, @RequestBody ExpenseEntity expenseEntity) {
        return expenseService.saveExpense(categoryId, expenseEntity);
    }

    @PutMapping("/categories/{categoryId}/expense/{expenseId}")
    public ExpenseEntity updateExpense(@PathVariable("expenseId") Long expenseId, @RequestBody ExpenseEntity expenseEntity) {
        return expenseService.updateExpense(expenseId, expenseEntity);
    }

    @DeleteMapping("/categories/{categoryId}/expense/{expenseId}")
    public void deleteExpense(@PathVariable("expenseId") Long expenseId) {
        expenseService.deleteExpense(expenseId);
    }
}
