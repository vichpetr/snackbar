package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "TRANSACTIONS")
public class Transaction {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "PAID")
    private boolean paid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BUYER_ID")
    private Avatar buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SNACK_ID")
    private Snack snack;

    @Column(name = "TRANSACTION_DATE")
    private LocalDateTime transactionDate;

    @PrePersist
    private void prePersist() {
        this.transactionDate = LocalDateTime.now();
    }
}
