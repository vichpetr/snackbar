package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;

import java.nio.file.Path;
import java.util.List;

public interface SendMailService {

    boolean sendMail(Avatar avatar, Path attachment, List<Transaction> transactionList);
}
