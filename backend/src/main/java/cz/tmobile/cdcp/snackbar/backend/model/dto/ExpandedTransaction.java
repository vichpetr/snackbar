package cz.tmobile.cdcp.snackbar.backend.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ExpandedTransaction {

    public ExpandedTransaction(Transaction transaction){
        this.id = transaction.getId();
        this.paid = transaction.isPaid();
        this.snack = transaction.getSnack().getName();
        this.owner = transaction.getSnack().getOwner().getName();
        this.price = transaction.getSnack().getPrice();
        this.transactionDate = transaction.getTransactionDate();
    }

    private Integer id;
    private boolean paid;
    private String snack;
    private String owner;
    private Integer price;

    @JsonFormat(pattern = "dd. MM. YYYY HH:mm:ss")
    private LocalDateTime transactionDate;
}