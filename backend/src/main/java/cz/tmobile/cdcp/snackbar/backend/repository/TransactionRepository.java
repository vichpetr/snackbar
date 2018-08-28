package cz.tmobile.cdcp.snackbar.backend.repository;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findTransactionById(Integer id);
    List<Transaction> findByBuyer(Avatar avatar);
}