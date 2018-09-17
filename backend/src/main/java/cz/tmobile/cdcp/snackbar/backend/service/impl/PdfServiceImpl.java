package cz.tmobile.cdcp.snackbar.backend.service.impl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.service.PdfService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileAttribute;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private DateTimeFormatter formatter;

    @Override
    public Path createPdf(Map<Avatar, List<Transaction>> transactionMap, Avatar avatar) {

        Document document = new Document();
        Path invoice;
        try {
            invoice = Files.createTempFile("invoice", ".pdf");
            PdfWriter.getInstance(document, new FileOutputStream(invoice.toFile()));

            document.open();
            for (Map.Entry<Avatar, List<Transaction>> entry: transactionMap.entrySet()) {
                PdfPTable table = new PdfPTable(3);
                addTableHeader(table, entry.getKey());
                addRows(table, entry.getValue());

                table.setPaddingTop(5);
                document.add(table);
            }
            document.close();

            return invoice;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("I/O error");
        } catch (DocumentException e) {
            e.printStackTrace();
            throw new RuntimeException("Document error");
        }
    }

    private void addTableHeader(PdfPTable table, Avatar avatar) {
        PdfPCell cell = new PdfPCell(new Phrase("Payment for " + avatar.getName()));
        cell.setColspan(3);
        cell.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        cell.setBorderWidth(2);
        table.addCell(cell);

        Stream.of("Název", "Datum", "Cena")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    private void addRows(PdfPTable table, List<Transaction> transactionList) {
        int totalPrice = 0;
        for (Transaction transaction : transactionList) {
            Integer price = transaction.getSnack().getPrice();

            table.addCell(transaction.getSnack().getName());
            table.addCell(transaction.getTransactionDate().format(formatter));
            table.addCell(Integer.toString(price));
            totalPrice += price;
        }

        PdfPCell cell = new PdfPCell(new Phrase("Celkem " + totalPrice + " Kč"));
        cell.setColspan(3);
        table.addCell(cell);
    }
}