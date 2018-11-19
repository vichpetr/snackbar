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

    @Override
    public String toString() {
        if (prefix == null) {
            return String.format("%s/%s", this.number, this.bankCode);
        }
        return String.format("%s-%s/%s", this.prefix, this.number, this.bankCode);
    }
}
