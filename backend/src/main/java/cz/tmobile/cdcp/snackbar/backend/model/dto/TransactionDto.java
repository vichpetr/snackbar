package cz.tmobile.cdcp.snackbar.backend.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.hateoas.ResourceSupport;

import java.time.LocalDateTime;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class TransactionDto extends ResourceSupport {

    private Integer entityId;

    private boolean paid;

    private Integer buyerId;

    private Integer snackId;

    private LocalDateTime transactionDate;
}
