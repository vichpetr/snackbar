package cz.tmobile.cdcp.snackbar.backend.utils;

import cz.tmobile.cdcp.snackbar.backend.controller.AvatarController;
import cz.tmobile.cdcp.snackbar.backend.controller.SnackController;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.dto.AvatartDto;
import cz.tmobile.cdcp.snackbar.backend.model.dto.SnackDto;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class AvatarUtils implements IConvertUtils<AvatartDto, Avatar> {

    @Override
    public AvatartDto toDto(Avatar entity) {
        AvatartDto dto = AvatartDto.builder()
                .entityId(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .pic(entity.getPic())
                .build();

        Link self = linkTo(methodOn(AvatarController.class).getAvatar(entity.getId())).withSelfRel();

        dto.add(self);
        return dto;
    }

    @Override
    public Avatar toEntity(AvatartDto dto) {
        Avatar entity = new Avatar();
        entity.setEmail(dto.getEmail());
        entity.setName(dto.getName());
        entity.setPic(dto.getPic());
        return entity;
    }
}
