package zti.financial_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.financial_management.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
