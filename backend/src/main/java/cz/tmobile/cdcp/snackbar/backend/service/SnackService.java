package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Snack;

import java.util.List;

public interface SnackService {
    Snack findSnack(Integer id);
    List<Snack> getSnacks();
    Snack addSnack(Snack snack);
}
