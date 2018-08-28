package cz.tmobile.cdcp.snackbar.backend.utils;

import cz.tmobile.cdcp.snackbar.backend.controller.AvatarController;
import cz.tmobile.cdcp.snackbar.backend.controller.SnackController;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.dto.SnackDto;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class SnackUtils implements IConvertUtils<SnackDto, Snack> {

    @Override
    public SnackDto toDto(Snack entity) {
        SnackDto dto = SnackDto.builder()
                .entityId(entity.getId())
                .name(entity.getName())
                .price(entity.getPrice())
                .pictype(entity.getPictype())
                .pic(entity.getPic())
                .build();

        Link owner = linkTo(AvatarController.class).slash(entity.getOwner().getId()).withRel("owner");
        Link self = linkTo(methodOn(SnackController.class).getSnack(entity.getId())).withSelfRel();
        Link transactions = linkTo(SnackController.class).slash(entity.getId()).slash("transactions").withRel("transactions");

        dto.add(self);
        dto.add(owner);
        dto.add(transactions);
        return dto;
    }

    @Override
    public Snack toEntity(SnackDto dto) {
        return null;
    }
}
