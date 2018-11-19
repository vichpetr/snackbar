package cz.tmobile.cdcp.snackbar.backend.service.impl.qrpayment;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import cz.tmobile.cdcp.snackbar.backend.exceptions.ValidationException;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.CzechAccountDto;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.PaymentAttributesDto;
import cz.tmobile.cdcp.snackbar.backend.model.dto.qrpayment.enums.AttributeType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.iban4j.Iban;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CreateQrCodeService {

    @Value("${qr-version}")
    private String version;

    private final ConvertAccountService convertService;

    @Autowired
    public CreateQrCodeService(ConvertAccountService convertService) {
        this.convertService = convertService;
    }

    private DecimalFormat df = new DecimalFormat("#.00");
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("YYYYMMdd");

    public byte[] getQrCodeImage(PaymentAttributesDto dto) throws WriterException, IOException {
        List<String> stringList = new ArrayList<>();
        stringList.add(dto.getPaymentType().name());
        stringList.add(version);
        validateAccountAndAddToList(stringList, Collections.singletonList(dto.getAccount()), AttributeType.ACC);
        if (dto.getOptionalAccounts() != null) {
            validateAccountAndAddToList(stringList, dto.getOptionalAccounts(), AttributeType.ALT_ACC);
        }

        validateAndAdd(stringList, AttributeType.AM, df.format(dto.getAmount()));
        validateAndAdd(stringList, AttributeType.CC, "CZK");
        validateAndAdd(stringList, AttributeType.DT, dto.getPaymentDate().format(formatter));
        if (StringUtils.isNotBlank(dto.getMessage())) {
            validateAndAdd(stringList, AttributeType.MSG, dto.getMessage());
        }

        String qrCodeText = String.join("*", stringList);
        return generateQRCodeImage(qrCodeText, dto);
    }

    private void validateAndAdd(List<String> stringList, AttributeType type, String format) {
        try {
            validateAndAddToList(stringList, type, format);
        } catch (ValidationException ex) {
            if (type.getRequired()) {
                throw ex;
            }
        }
    }

    private void validateAndAddToList(List<String> stringList, AttributeType attributeType, String formatted) throws ValidationException {
        validateLength(formatted, attributeType);
        String value = prepareValue(attributeType, formatted);
        stringList.add(value);
    }

    private void validateAccountAndAddToList(List<String> stringList, List<CzechAccountDto> accounts, AttributeType attributeType) {
        try {
            String iban = accounts.stream().map(this.convertService::convertToIban).map(Iban::toString).collect(Collectors.joining(","));
            validateAndAddToList(stringList, attributeType, iban);
        } catch (ValidationException ex) {
            if (attributeType.getRequired()) {
                throw ex;
            }
        }
    }

    private void validateLength(String value, AttributeType acc) {
        if (value == null) {
            throw new ValidationException(log, UUID.randomUUID(), "Value for type {} must be not null", acc.name());
        }

        if (value.length() > acc.getMaxLength()) {
            throw new ValidationException(log, UUID.randomUUID(), "Value with type {} has bigger length than expected. Maximal available length is {}, actual is {}", acc.name(), acc.getMaxLength(),
                    value.length());
        }

        if (value.length() < acc.getMinLength()) {
            throw new ValidationException(log, UUID.randomUUID(), "Value with type {} has smaller length than expected. Minimal available length is {}, actual is {}", acc.name(), acc.getMinLength(),
                    value.length());
        }
    }

    private String prepareValue(AttributeType acc, String value) {
        return acc.getValue().concat(":").concat(value);
    }

    private byte[] generateQRCodeImage(String text, PaymentAttributesDto dto) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, dto.getWidth(), dto.getHeight());

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, dto.getImageType(), pngOutputStream);

        InputStream in = new ByteArrayInputStream(pngOutputStream.toByteArray());
        BufferedImage image = ImageIO.read(in);

        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setStroke(new BasicStroke(3));
        graphics.setColor(Color.BLACK);
        graphics.drawRect(10, 10, image.getWidth() - 20, image.getHeight() - 20);

        String drawText = dto.getAccount().toString();
        FontMetrics metrics = graphics.getFontMetrics(graphics.getFont());
        int x = (image.getWidth() - metrics.stringWidth(drawText)) / 2 + metrics.getAscent();
        int y = image.getHeight() - 5;
        graphics.setColor(Color.WHITE);
        graphics.drawLine(x - 5, y - 5, x + 5 + metrics.stringWidth(drawText) + metrics.getAscent(), y - 5);
        graphics.setColor(Color.BLACK);
        graphics.drawString(drawText, x, y);

        pngOutputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", pngOutputStream);

        return pngOutputStream.toByteArray();
    }
}
