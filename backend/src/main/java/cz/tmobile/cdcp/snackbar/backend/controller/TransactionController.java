package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.PaymentRequest;
import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransactionList;
import cz.tmobile.cdcp.snackbar.backend.model.dto.TransactionDto;
import cz.tmobile.cdcp.snackbar.backend.service.TransactionService;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.utils.TransactionUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(path = "/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionUtils transactionUtils;

    @CrossOrigin
    @GetMapping(path = "/my")
    public ExpandedTransactionList findTransaction(@RequestHeader("userId") Integer userId, @RequestParam(value = "paid", defaultValue = "false") boolean paid) {
        return transactionService.findTransactions(userId, paid);
    }

    @GetMapping
    @CrossOrigin
    public List<TransactionDto> getTransactions() {
        return transactionService.getTransactions().stream()
                .map(transactionUtils::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    @CrossOrigin
    public TransactionDto addTransaction(@RequestBody TransactionDto dto) {
        Transaction transaction = transactionService.addTransaction(dto);
        return transactionUtils.toDto(transaction);
    }

    @CrossOrigin
    @PostMapping("/pay")
    public ExpandedTransactionList payTransactions(@RequestBody PaymentRequest paymentRequest, @RequestParam(value = "paid", defaultValue = "false") boolean paid) {
        return transactionService.payTransactions(paymentRequest.getBuyer(), paymentRequest.getIds(), paid);
    }
}
