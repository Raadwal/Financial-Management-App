package zti.financial_management.service.implementation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zti.financial_management.entity.SavingGoalEntity;
import zti.financial_management.entity.UserEntity;
import zti.financial_management.repository.SavingGoalRepository;
import zti.financial_management.repository.UserRepository;
import zti.financial_management.service.SavingGoalService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class SavingGoalServiceImplementation implements SavingGoalService {

    private final SavingGoalRepository savingGoalRepository;
    private final UserRepository userRepository;

    @Override
    public List<SavingGoalEntity> findAllSavingsGoals(String email) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with email: " + email)
        );

        return user.getUserSavingsGoals();
    }

    @Override
    @Transactional
    public SavingGoalEntity saveSavingGoal(String email, SavingGoalEntity savingGoalEntity) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with email: " + email)
        );
        savingGoalEntity.setUser(user);

        return savingGoalRepository.save(savingGoalEntity);
    }

    @Override
    @Transactional
    public SavingGoalEntity updateSavingGoal(Long id, SavingGoalEntity savingGoalEntity) {
        SavingGoalEntity existingSavingGoal = savingGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saving goal not found with id: " + savingGoalEntity.getId()));

        existingSavingGoal.setDescription(savingGoalEntity.getDescription());
        existingSavingGoal.setCurrentAmount(savingGoalEntity.getCurrentAmount());
        existingSavingGoal.setTargetAmount(savingGoalEntity.getTargetAmount());
        existingSavingGoal.setTargetDate(savingGoalEntity.getTargetDate());

        return savingGoalRepository.save(existingSavingGoal);
    }

    @Override
    @Transactional
    public void deleteSavingGoal(Long id) {
        SavingGoalEntity savingGoal = savingGoalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Saving goal not found with id: " + id));

        savingGoal.setUser(null);
        savingGoalRepository.save(savingGoal);
        savingGoalRepository.deleteById(id);
    }
}
