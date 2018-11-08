package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.SnackDto;

import java.util.List;

public interface SnackService {
    Snack findSnack(Integer id);
    List<Snack> getSnacks();
    Snack addSnack(SnackDto snack, Integer ownerId);
    List<ExpandedTransaction> findAllTransactions(Integer id);
    void updateCount(Integer snackId, int count);
}
