package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean paid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer")
    private Avatar buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack")
    private Snack snack;

    private LocalDateTime transactionDate;
}
