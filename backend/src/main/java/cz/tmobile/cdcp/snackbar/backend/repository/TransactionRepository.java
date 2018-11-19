package cz.tmobile.cdcp.snackbar.backend.repository;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findTransactionById(Integer id);

    List<Transaction> findByBuyer(Avatar avatar);

    List<Transaction> findByBuyerAndPaid(Avatar avatar, boolean paid);

    @Query("SELECT SUM(t.snack.price) from Transaction t where t.paid = :paid and t.buyer = :buyer")
    Integer getSumOfUnpaidTransactions(@Param("buyer") Avatar avatar,@Param("paid")  boolean paid);

    @Query("SELECT SUM(t.snack.price) from Transaction t where t.buyer = :buyer")
    int getSumOfAllTransactions(@Param("buyer") Avatar avatar);
}