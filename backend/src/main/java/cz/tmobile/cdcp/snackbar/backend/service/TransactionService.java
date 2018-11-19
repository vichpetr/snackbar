package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransactionList;
import cz.tmobile.cdcp.snackbar.backend.model.dto.TransactionDto;

import java.util.List;

public interface TransactionService {

    ExpandedTransactionList findTransactions(Integer id, boolean paid);
    ExpandedTransactionList payTransactions(Integer buyer, List<Integer> ids, boolean paid);
    List<Transaction> findTransactionsByBuyer(Avatar id);
    List<Transaction> getTransactions();
    Transaction addTransaction(TransactionDto transaction);

}