package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.TransactionDto;

import java.util.List;

public interface TransactionService {

    List<ExpandedTransaction> findTransactions(Integer id);
    List<ExpandedTransaction> payTransactions(Integer buyer, List<Integer> ids);
    List<Transaction> findTransactionsByBuyer(Avatar id);
    List<Transaction> getTransactions();
    Transaction addTransaction(TransactionDto transaction);

}