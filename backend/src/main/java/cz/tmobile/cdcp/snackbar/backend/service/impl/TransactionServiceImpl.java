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
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
    public List<ExpandedTransaction> findTransactions(Integer id) {
        Avatar avatar = this.avatarService.findAvatar(id);
        List<Transaction> transactions = findTransactionsByBuyer(avatar);
        return transactions.stream()
                .map(ExpandedTransaction::new)
                .collect(Collectors.toList());
    }

    @Modifying
    public List<ExpandedTransaction> payTransactions(Integer buyer, List<Integer> ids) {
        List<Transaction> paidTransactions = new ArrayList<>();
        for (Integer id : ids) {
            Transaction transaction = transactionRepository.findTransactionById(id);
            if (!transaction.isPaid() && transaction.getBuyer().getId().equals(buyer)) {
                transaction.setPaid(true);
                Transaction save = transactionRepository.save(transaction);
                paidTransactions.add(save);
            }
        }

        if (!paidTransactions.isEmpty()) {
            this.prepareAndSendEmail(paidTransactions);
        }

        return this.findTransactions(buyer);
    }

    private void prepareAndSendEmail(List<Transaction> transactions) {
        Set<Avatar> recipients = transactions.stream()
                .map(Transaction::getBuyer)
                .collect(Collectors.toSet());

        if (recipients.size() > 1) {
            log.error("More than one recipient to send invoice.");
            throw new RuntimeException("More than one recipient to send invoice.");
        }

        Avatar avatar = recipients.stream()
                .findAny()
                .orElseThrow(() -> new RuntimeException("No available avatar"));

        Path pdf = pdfService.createPdf(transactions, avatar);
        log.info("pdfFileName is {}", pdf.getFileName());
        mailService.sendMail(avatar, pdf, transactions);
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