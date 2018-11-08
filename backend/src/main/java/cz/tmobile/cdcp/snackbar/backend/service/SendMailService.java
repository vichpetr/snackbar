package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public interface SendMailService {

    boolean sendMail(Avatar avatar, List<Path> attachment, Map<Avatar, List<Transaction>> transactionMap);
}
