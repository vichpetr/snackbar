package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.PaymentRequest;
import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.service.TransactionService;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@Slf4j

public class TransactionController {
    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService TransactionService){
        this.transactionService = TransactionService;
    }

    @PostMapping("/api/transaction")
    @CrossOrigin
    public List<ExpandedTransaction> findTransaction(@RequestBody Search search) {
        List<ExpandedTransaction> foundTransactions = transactionService.findTransactions(search.id);

        return foundTransactions;
    }

    @PostMapping("/api/transaction/all")
    @CrossOrigin
    public List<Transaction> getTransactions() {

        List<Transaction> foundTransactions = transactionService.getTransactions();

        return foundTransactions;
    }

    @PostMapping("/api/transaction/add")
    @CrossOrigin
    public Transaction addTransaction(@RequestBody Transaction transaction) {

        Transaction addedTransaction = transactionService.addTransaction(transaction);

        return addedTransaction;
    }

    @PostMapping("/api/transaction/pay")
    @CrossOrigin
    public List<ExpandedTransaction> payTransactions(@RequestBody PaymentRequest paymentRequest) {

        List<ExpandedTransaction> foundTransaction = transactionService.payTransactions(paymentRequest.getBuyer(),paymentRequest.getIds());

        return foundTransaction;
    }


}
