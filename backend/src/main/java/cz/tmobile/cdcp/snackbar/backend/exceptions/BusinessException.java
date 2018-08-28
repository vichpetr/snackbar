package cz.tmobile.cdcp.snackbar.backend.exceptions;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.helpers.FormattingTuple;
import org.slf4j.helpers.MessageFormatter;

import java.util.UUID;

@Getter
public class BusinessException extends RuntimeException {

    private UUID uuid;

    public BusinessException(Logger logger, UUID uuid, String message, Object... params) {
        super(prepareMessage(logger, uuid, message, params));
        this.uuid = uuid;
    }

    public BusinessException(Logger logger, UUID uuid, String message, Throwable cause, Object... params) {
        super(prepareMessage(logger, uuid, message, params), cause);
        this.uuid = uuid;
    }

    /**
     * Prepare error message and substitute all params to one string. Create error log using input logger instance.
     *
     * @param logger
     * @param uuid
     * @param message
     * @param params
     * @return
     */
    private static String prepareMessage(Logger logger, UUID uuid, String message, Object... params) {
        FormattingTuple there = MessageFormatter.format(message, params);
        logger.error("=================== Error message id {} ================= ", uuid);
        logger.error(message, params);
        return there.getMessage();
    }
}