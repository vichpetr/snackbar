package cz.tmobile.cdcp.snackbar.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExpandedTransactionList {

    private Integer totalAll;
    private Integer totalUnpaid;
    private List<ExpandedTransaction> transactions;
}