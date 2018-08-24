package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.repository.TransactionRepository;
import cz.tmobile.cdcp.snackbar.backend.repository.AvatarRepository;
import cz.tmobile.cdcp.snackbar.backend.repository.SnackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{
    private final TransactionRepository transactionRepository;
    private final AvatarService avatarService;
    private final SnackService snackService;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepository, AvatarService avatarService, SnackService snackService) {
        this.transactionRepository = transactionRepository;
        this.snackService = snackService;
        this.avatarService = avatarService;
    }

    @Override
    public Transaction findTransaction(Integer id) {
        return transactionRepository.findTransactionById(id);
    }

    @Override
    public List<ExpandedTransaction> findTransactions(Integer id) {
        List<ExpandedTransaction> expandedTransactions = new ArrayList<>();
        List<Transaction> transactions = findTransactionsByBuyer(id);

        for (Transaction transaction : transactions) {

            Snack selectedSnack = snackService.findSnack(transaction.getSnack());
            String snack = selectedSnack.getName();
            Integer price = selectedSnack.getPrice();
            String owner = avatarService.findAvatar(selectedSnack.getOwner()).getName();
            ExpandedTransaction expandedTransaction = new ExpandedTransaction(transaction.getId(),transaction.isPaid(),snack,owner,price,transaction.getTransaction_date());
            expandedTransactions.add(expandedTransaction);
        }
        return expandedTransactions;
    }

    @Modifying
    public List<ExpandedTransaction> payTransactions(Integer buyer, List<Integer> ids) {
        for (Integer id : ids) {
            Transaction transaction = transactionRepository.findTransactionById(id);
            if (transaction.isPaid() == false && transaction.getBuyer() == buyer) {
                transaction.setPaid(true);
                transactionRepository.save(transaction);
            }
        }

        return this.findTransactions(buyer);
    }

    @Override
    public List<Transaction> findTransactionsByBuyer(Integer id) {
        return transactionRepository.findTransactionsByBuyer(id);
    }

    @Override
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();

    }

    @Modifying
    public Transaction addTransaction(Transaction transaction) {return transactionRepository.save(transaction); }


}