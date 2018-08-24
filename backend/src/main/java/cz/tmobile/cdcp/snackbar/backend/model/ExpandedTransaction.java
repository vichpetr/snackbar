package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpandedTransaction {
    private Integer id;
    private boolean paid;
    private String snack;
    private String owner;
    private Integer price;
    private Timestamp transaction_date;
}