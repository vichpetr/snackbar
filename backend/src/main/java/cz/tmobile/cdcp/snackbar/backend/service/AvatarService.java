package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;

import java.util.List;

public interface AvatarService {
    Avatar findAvatar(Integer id);
    List<Avatar> getAvatars();
    Avatar addAvatar(Avatar avatar);
}
