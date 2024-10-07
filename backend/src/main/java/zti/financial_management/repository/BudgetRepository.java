package zti.financial_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import zti.financial_management.entity.BudgetEntity;
import zti.financial_management.entity.CategoryEntity;

import java.util.Date;
import java.util.List;

public interface BudgetRepository extends JpaRepository<BudgetEntity, Long> {
    List<BudgetEntity> findByCategory(CategoryEntity category);

    @Modifying
    @Transactional
    @Query(value = "UPDATE tb_budgets SET current_amount = current_amount + :amount WHERE category_id = :categoryId AND :expenseDate BETWEEN start_date AND end_date", nativeQuery = true)
    void updateBudgetAmount(Float amount, Long categoryId, Date expenseDate);

}
