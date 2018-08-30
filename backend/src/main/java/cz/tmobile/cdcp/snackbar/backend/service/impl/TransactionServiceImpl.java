package cz.tmobile.cdcp.snackbar.backend.service.impl;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.TransactionDto;
import cz.tmobile.cdcp.snackbar.backend.repository.TransactionRepository;
import cz.tmobile.cdcp.snackbar.backend.service.AvatarService;
import cz.tmobile.cdcp.snackbar.backend.service.PdfService;
import cz.tmobile.cdcp.snackbar.backend.service.SendMailService;
import cz.tmobile.cdcp.snackbar.backend.service.TransactionService;
import cz.tmobile.cdcp.snackbar.backend.utils.TransactionUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TransactionServiceImpl implements TransactionService {

    private TransactionRepository transactionRepository;

    private TransactionUtils transactionUtils;

    private PdfService pdfService;

    private AvatarService avatarService;

    private SendMailService mailService;

    @Override
    public List<ExpandedTransaction> findTransactions(Integer id, boolean paid) {
        Avatar avatar = this.avatarService.findAvatar(id);
        List<Transaction> transactions;
        if (paid) {
            transactions = findTransactionsByBuyer(avatar);
        } else {
            transactions = this.transactionRepository.findByBuyerAndPaid(avatar, false);
        }
        return transactions.stream()
                .map(ExpandedTransaction::new)
                .collect(Collectors.toList());
    }

    @Modifying
    public List<ExpandedTransaction> payTransactions(Integer buyerId, List<Integer> ids, boolean paid) {
        Map<Avatar, List<Transaction>> paidTransactions = new HashMap<>();
        Avatar buyer = this.avatarService.findAvatar(buyerId);
        for (Integer id : ids) {
            Transaction transaction = transactionRepository.findTransactionById(id);
            if (!transaction.isPaid() && transaction.getBuyer().equals(buyer)) {
                transaction.setPaid(true);
                Transaction save = transactionRepository.save(transaction);

                Avatar owner = save.getSnack().getOwner();
                if (!owner.equals(buyer)) {
                    List<Transaction> list;
                    if (paidTransactions.containsKey(owner)) {
                        list = paidTransactions.get(owner);
                    } else {
                        list = new ArrayList<>();
                    }
                    list.add(save);
                    paidTransactions.put(owner, list);
                }
            }
        }

        if (!paidTransactions.isEmpty()) {
            this.prepareAndSendEmail(buyer, paidTransactions);
        }

        return this.findTransactions(buyerId, paid);
    }

    private void prepareAndSendEmail(Avatar buyer, Map<Avatar, List<Transaction>> transactionMap) {

        Path pdf = pdfService.createPdf(transactionMap, buyer);
        log.info("pdfFileName is {}", pdf.getFileName());
        mailService.sendMail(buyer, pdf, transactionMap);
    }

    @Override
    public List<Transaction> findTransactionsByBuyer(Avatar avatar) {
        return transactionRepository.findByBuyer(avatar);
    }

    @Override
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction addTransaction(TransactionDto dto) {
        Transaction transaction = transactionUtils.toEntity(dto);
        return transactionRepository.save(transaction);
    }

}