package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public interface PdfService {

    Path createPdf(Map<Avatar, List<Transaction>> transactionMap, Avatar avatar);
}
