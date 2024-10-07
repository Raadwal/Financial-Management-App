package zti.financial_management.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_savings_goals")
public class SavingGoalEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private UserEntity user;

    @Column(name = "description")
    private String description;

    @Column(name = "current_amount")
    private Float currentAmount;

    @Column(name = "target_amount")
    private Float targetAmount;

    @Column(name = "target_date")
    private Date targetDate;

}
