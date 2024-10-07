package zti.financial_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.financial_management.entity.SavingGoalEntity;

import java.util.Optional;

public interface SavingGoalRepository extends JpaRepository<SavingGoalEntity, Long> {
}
