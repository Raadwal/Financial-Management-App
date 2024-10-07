package zti.financial_management.service;

import zti.financial_management.entity.SavingGoalEntity;

import java.util.List;

public interface SavingGoalService {

    List<SavingGoalEntity> findAllSavingsGoals(String email);
    SavingGoalEntity saveSavingGoal(String email, SavingGoalEntity savingGoalEntity);
    SavingGoalEntity updateSavingGoal(Long id, SavingGoalEntity savingGoalEntity);
    void deleteSavingGoal(Long id);

}
