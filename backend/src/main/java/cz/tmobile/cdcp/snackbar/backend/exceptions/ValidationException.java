package cz.tmobile.cdcp.snackbar.backend.exceptions;

import org.slf4j.Logger;

import java.util.UUID;

public class ValidationException extends BusinessException {

    public ValidationException(Logger logger, UUID uuid, String message, Object... params) {
        super(logger, uuid, message, params);
    }

    public ValidationException(Logger logger, UUID uuid, String message, Throwable cause, Object... params) {
        super(logger, uuid, message, cause, params);
    }
}
