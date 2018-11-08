package cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {

    EMAIL("E"), PHONE("P");

    private String value;
}
