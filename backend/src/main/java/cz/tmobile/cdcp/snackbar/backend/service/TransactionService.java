package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction findTransaction(Integer id);
    List<ExpandedTransaction> findTransactions(Integer id);
    List<ExpandedTransaction> payTransactions(Integer buyer, List<Integer> ids);
    List<Transaction> findTransactionsByBuyer(Integer id);
    List<Transaction> getTransactions();
    Transaction addTransaction(Transaction transaction);

}