package cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CzechAccountDto {

    private String prefix;
    @NotNull
    private String number;
    @NotNull
    private String bankCode;
}
