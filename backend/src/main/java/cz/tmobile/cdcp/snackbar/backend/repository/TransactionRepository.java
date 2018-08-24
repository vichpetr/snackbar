package cz.tmobile.cdcp.snackbar.backend.repository;

import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
    Transaction findTransactionById(Integer id);
    List<Transaction> findTransactionsByBuyer(Integer id);
    List<Transaction> findAll();

}