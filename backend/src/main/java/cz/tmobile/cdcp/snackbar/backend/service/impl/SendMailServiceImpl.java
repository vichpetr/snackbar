package cz.tmobile.cdcp.snackbar.backend.service.impl;

import cz.tmobile.cdcp.snackbar.backend.exceptions.BusinessException;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.service.SendMailService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class SendMailServiceImpl implements SendMailService {

    @NonNull
    private TemplateEngine templateEngine;

    @NonNull
    private JavaMailSender sender;

    @Value("${snackapp.mail.sender}")
    private String fromEmail;

    @Override
    public boolean sendMail(Avatar avatar, Path attachment, Map<Avatar, List<Transaction>> transactionMap) {

        String subject = "E-mail notification from SnackBar application - send invoice";

        MimeMessage message = sender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(avatar.getEmail());
            helper.setText(prepareMessageFromDto(avatar, subject, transactionMap), true);
            helper.setFrom(new InternetAddress(fromEmail));
            helper.setSubject(subject);
            helper.addAttachment(attachment.getFileName().toString(), attachment.toFile());
            log.debug("before send email");
            sender.send(message);
            log.info("Email with subject {} was send.", subject);
        } catch (MessagingException e) {
            throw new BusinessException(log, UUID.randomUUID(), "Could not prepeare mal message", e);
        } catch (MailException e) {
            throw new BusinessException(log, UUID.randomUUID(), "Could not send email.", e);
        }

        return false;
    }

    private String prepareMessageFromDto(Avatar avatar, String subject, Map<Avatar, List<Transaction>> transactionMap) {
        Integer totalPrice = 0;
        Map<String, Integer> priceMap = new HashMap<>();
        for(Map.Entry<Avatar, List<Transaction>> entry : transactionMap.entrySet()){
            Integer totalPricePerAvatar = entry.getValue().stream()
                    .map(Transaction::getSnack)
                    .mapToInt(Snack::getPrice).sum();
            priceMap.put(entry.getKey().getName(), totalPricePerAvatar);
            totalPrice += totalPricePerAvatar;
        }

        final Context ctx = new Context();
        ctx.setVariable("subject", subject);
        ctx.setVariable("userName", avatar.getName());
        ctx.setVariable("priceMap", priceMap);
        ctx.setVariable("totalPrice", totalPrice);

        return this.templateEngine.process("mailTemplate.html", ctx);
    }
}
