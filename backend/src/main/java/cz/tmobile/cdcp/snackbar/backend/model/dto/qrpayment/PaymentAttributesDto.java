package cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment;

import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.enums.NotificationType;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.enums.PaymentType;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class PaymentAttributesDto {

    @NotNull
    private CzechAccountDto account;

    @NotNull
    private Double amount;

    private String message;

    private List<CzechAccountDto> optionalAccounts;

    @Builder.Default
    private LocalDate paymentDate = LocalDate.now();

    private NotificationType notificationType;

    @Builder.Default
    private PaymentType paymentType = PaymentType.SPD;

    @Builder.Default
    private Integer height = 350;

    @Builder.Default
    private Integer width = 350;

    @Builder.Default
    private String imageType = "PNG";
}
