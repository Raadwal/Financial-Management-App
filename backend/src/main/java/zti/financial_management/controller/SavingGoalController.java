package zti.financial_management.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zti.financial_management.config.JwtService;
import zti.financial_management.entity.SavingGoalEntity;
import zti.financial_management.service.SavingGoalService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/savings-goals")
public class SavingGoalController {

    private final SavingGoalService savingGoalService;
    private final JwtService jwtService;

    @GetMapping
    public List<SavingGoalEntity> findAllSavingsGoals(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return savingGoalService.findAllSavingsGoals(email);
    }

    @PostMapping
    public SavingGoalEntity saveSavingGoal(@RequestHeader("Authorization") String token, @RequestBody SavingGoalEntity savingGoalEntity) {
        String email = jwtService.extractUsernameFromUnprocessedToken(token);
        return savingGoalService.saveSavingGoal(email, savingGoalEntity);
    }

    @PutMapping("/{id}")
    public SavingGoalEntity updateSavingGoal(@PathVariable("id") Long id, @RequestBody SavingGoalEntity savingGoalEntity) {
        return savingGoalService.updateSavingGoal(id, savingGoalEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteSavingGoal(@RequestHeader("Authorization") String token, @PathVariable("id") Long id) {
        savingGoalService.deleteSavingGoal(id);
    }
}
