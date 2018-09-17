package cz.tmobile.cdcp.snackbar.backend.utils;

import cz.tmobile.cdcp.snackbar.backend.controller.SnackController;
import cz.tmobile.cdcp.snackbar.backend.controller.TransactionController;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.Transaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.TransactionDto;
import cz.tmobile.cdcp.snackbar.backend.service.AvatarService;
import cz.tmobile.cdcp.snackbar.backend.service.SnackService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Slf4j
@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TransactionUtils implements IConvertUtils<TransactionDto, Transaction> {

    private AvatarService avatarService;

    private SnackService snackService;

    @Override
    public TransactionDto toDto(Transaction entity) {
        TransactionDto dto = TransactionDto.builder()
                .entityId(entity.getId())
                .paid(entity.isPaid())
                .transactionDate(entity.getTransactionDate())
                .buyerId(entity.getBuyer().getId())
                .snackId(entity.getSnack().getId())
                .build();

        Link buyer = linkTo(TransactionController.class).slash(entity.getBuyer().getId()).withRel("buyer");
        Link snack = linkTo(TransactionController.class).slash(entity.getId()).slash("snack").withRel("snack");
        Link self = linkTo(methodOn(SnackController.class).getSnack(entity.getId())).withSelfRel();

        dto.add(self);
        dto.add(buyer);
        dto.add(snack);
        return dto;
    }

    @Override
    public Transaction toEntity(TransactionDto dto) {
        Avatar avatar = avatarService.findAvatar(dto.getBuyerId());
        Snack snack = snackService.findSnack(dto.getSnackId());

        Transaction entity = new Transaction();
        entity.setPaid(dto.isPaid());
        entity.setBuyer(avatar);
        entity.setSnack(snack);
        return entity;
    }
}
