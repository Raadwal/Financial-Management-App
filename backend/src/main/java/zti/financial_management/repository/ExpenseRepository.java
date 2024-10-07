package zti.financial_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import zti.financial_management.entity.CategoryEntity;
import zti.financial_management.entity.ExpenseEntity;

import java.util.Date;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {
    @Query("SELECT e FROM ExpenseEntity e WHERE e.category.user.email = :userEmail")
    List<ExpenseEntity> findAllByUserEmail(String userEmail);

    @Query("SELECT e FROM ExpenseEntity e WHERE e.category.id = :categoryId AND e.date BETWEEN :startDate AND :endDate")
    List<ExpenseEntity> findAllByUserEmailAndDateBetween(Long categoryId, Date startDate, Date endDate);

    @Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.category.id = :categoryId AND e.date BETWEEN :startDate AND :endDate")
    Float findSumOfExpensesInDateRange(Long categoryId, Date startDate, Date endDate);


    List<ExpenseEntity> findByCategory(CategoryEntity category);
}
