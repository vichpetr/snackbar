package cz.tmobile.cdcp.snackbar.backend.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class TransactionDto extends ResourceSupport {

    private Integer entityId;

    private boolean paid;

    private Integer buyerId;

    private Integer snackId;

    private LocalDateTime transactionDate;
}
