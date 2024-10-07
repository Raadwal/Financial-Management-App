package zti.financial_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_expenses")
public class ExpenseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="category_id", referencedColumnName = "id")
    private CategoryEntity category;

    @Column(name = "description")
    private String description;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "date")
    private Date date;
}
