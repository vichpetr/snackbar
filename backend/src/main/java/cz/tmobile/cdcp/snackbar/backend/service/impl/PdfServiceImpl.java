package cz.tmobile.cdcp.snackbar.backend.service.impl;

import com.google.zxing.WriterException;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import cz.tmobile.cdcp.snackbar.backend.exceptions.BusinessException;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.CzechAccountDto;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.PaymentAttributesDto;
import cz.tmobile.cdcp.snackbar.backend.service.PdfService;
import cz.tmobile.cdcp.snackbar.backend.service.impl.qrpayment.CreateQrCodeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileAttribute;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PdfServiceImpl implements PdfService {

    private static final String BANK_ACCOUNT_REGEX = "\\d{0,6}\\-{0,1}\\d{1,10}\\/\\d{4}";

    private final DateTimeFormatter formatter;

    private final CreateQrCodeService qrCodeService;

    @Override
    public List<Path> createPdf(Map<Avatar, List<Transaction>> transactionMap, Avatar avatar) {

        Document document = new Document();
        List<Path> list = new ArrayList<>();
        Path invoice;
        try {
            invoice = Files.createTempFile("invoice", ".pdf");
            PdfWriter.getInstance(document, new FileOutputStream(invoice.toFile()));

            document.open();
            for (Map.Entry<Avatar, List<Transaction>> entry : transactionMap.entrySet()) {
                PdfPTable table = new PdfPTable(4);
                Avatar owner = entry.getKey();
                addTableHeader(table, owner);
                Path path = addRowsAndReturnQrCode(table, entry.getValue(), owner);
                if (path != null) {
                    list.add(path);
                }

                table.setPaddingTop(5);
                document.add(table);
            }
            document.close();
            list.add(invoice);
            return list;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("I/O error");
        } catch (DocumentException e) {
            e.printStackTrace();
            throw new RuntimeException("Document error");
        }
    }

    private Path qrCode(Avatar avatar, Double totalPrice, String message) {

        try {
            PaymentAttributesDto build = dtoFromAvatar(avatar, totalPrice, message);
            byte[] qrCodeImage = qrCodeService.getQrCodeImage(build);
            Path qrCodeFile = Files.createTempFile("QR_CODE_", ".".concat(build.getImageType().toLowerCase()));
            FileUtils.writeByteArrayToFile(qrCodeFile.toFile(), qrCodeImage);
            return qrCodeFile;
        } catch (IOException | WriterException e) {
            throw new BusinessException(log, UUID.randomUUID(), "Could not generate QR Code for avatar {}", avatar.getName());
        }

    }

    private PaymentAttributesDto dtoFromAvatar(Avatar avatar, Double amount, String message) {
        String bankAccountText = avatar.getBankAccount();
        if (StringUtils.isBlank(bankAccountText) || !bankAccountText.matches(BANK_ACCOUNT_REGEX)) {
            throw new BusinessException(log, UUID.randomUUID(), "Bank Account {[]} for avatar is not valid {}", avatar.getBankAccount(), avatar.getName());
        }

        CzechAccountDto bankAccount = new CzechAccountDto();
        if(bankAccountText.contains("-")) {
            StringTokenizer tokenizer = new StringTokenizer(bankAccountText, "-/");
            bankAccount.setPrefix(tokenizer.nextToken());
            bankAccount.setNumber(tokenizer.nextToken());
            bankAccount.setBankCode(tokenizer.nextToken());
        } else {
            StringTokenizer tokenizer = new StringTokenizer(bankAccountText, "/");
            bankAccount.setNumber(tokenizer.nextToken());
            bankAccount.setBankCode(tokenizer.nextToken());
        }

        return PaymentAttributesDto.builder()
                .account(bankAccount)
                .amount(amount)
                .message(message)
                .build();
    }

    private void addTableHeader(PdfPTable table, Avatar avatar) {
        PdfPCell cell = new PdfPCell(new Phrase("Payment for " + avatar.getName()));
        cell.setColspan(4);
        cell.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        cell.setBorderWidth(2);
        table.addCell(cell);

        Stream.of("Název", "Datum", "Cena", "QR Code")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

    private Path addRowsAndReturnQrCode(PdfPTable table, List<Transaction> values, Avatar owner) {

        double totalPrice = values.stream().map(Transaction::getSnack).map(Snack::getPrice).mapToInt(Integer::intValue).sum();
        boolean firstRow = true;
        Path path = null;
        for (Transaction transaction : values) {
            Integer price = transaction.getSnack().getPrice();

            table.addCell(transaction.getSnack().getName());
            table.addCell(transaction.getTransactionDate().format(formatter));
            table.addCell(Integer.toString(price));
            if (firstRow) {
                firstRow = false;
                try {
                    String message = "SnackBar payment";
                    path = this.qrCode(owner, totalPrice, message);
                    Image img = Image.getInstance(path.toFile().getAbsolutePath());
                    PdfPCell cell = new PdfPCell(img, true);
                    cell.setRowspan(values.size());
                    table.addCell(cell);
                } catch (BusinessException ex) {
                    path = null;
                    //do nothing - exception is already logged.
                } catch (IOException | BadElementException e) {
                    log.warn("Problem with adding image to pdf file");
                    path = null;
                }
            }
        }


        PdfPCell cell = new PdfPCell(new Phrase("Celkem " + totalPrice + " Kč"));
        cell.setColspan(4);
        table.addCell(cell);

        return path;
    }
}
