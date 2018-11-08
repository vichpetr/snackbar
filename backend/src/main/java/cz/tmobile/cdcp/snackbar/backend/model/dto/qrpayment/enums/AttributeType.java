package cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.enums;

import lombok.Getter;
import lombok.NonNull;

/**
 * @link to https://www.czech-ba.cz/sites/default/files/standard_26_qr_externi_final_srpen_2015.pdf
 */
@Getter
public enum AttributeType {

    ACC("ACC", 46, Boolean.TRUE),
    ALT_ACC("ALT-ACC", 93),
    AM("AM", 10),
    CC("CC", 3, 3),
    RF("RF", 16),
    RN("RN", 35),
    DT("DT", 8, 8),
    PT("PT", 3),
    MSG("MSG", 60),
    CRC32("CRC32", 8, 8),
    NT("NT", 1, 1),
    NTA("NTA", 320),
    DL("DL", 8, 8),
    FRQ("FRQ", 3),
    DH("DH", 1),

    X_PER("X-PER", Boolean.TRUE, 2),
    X_VS("X-VS", Boolean.TRUE, 10),
    X_SS("X-SS", Boolean.TRUE, 10),
    X_KS("X-KS", Boolean.TRUE, 10),
    X_ID("X-ID", Boolean.TRUE, 20),
    X_URL("X-URL", Boolean.TRUE, 140);

    @NonNull
    private String value;
    @NonNull
    private Integer maxLength;

    private Integer minLength;

    private Boolean required;
    private Boolean onlyCzech;

    AttributeType(String value, Integer maxLength, Integer minLength, Boolean required, Boolean onlyCzech) {
        this.value = value;
        this.maxLength = maxLength;
        this.minLength = minLength;
        this.required = required;
        this.onlyCzech = onlyCzech;
    }

    AttributeType(String value, Integer maxLength, Integer minLength) {
        this(value, maxLength, minLength, Boolean.FALSE, Boolean.FALSE);
    }

    AttributeType(String value, Integer maxLength) {
        this(value, maxLength, 0, Boolean.FALSE, Boolean.FALSE);
    }

    AttributeType(String value, Boolean onlyCzech, Integer maxLength) {
        this(value, maxLength, 0, Boolean.FALSE, onlyCzech);
    }

    AttributeType(String value, Integer maxLength, Boolean required) {
        this(value, maxLength, 0, required, Boolean.FALSE);
    }
}
