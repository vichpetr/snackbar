package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.repository.AvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvatarServiceImpl implements AvatarService{
    private final AvatarRepository avatarRepository;

    @Autowired
    public AvatarServiceImpl(AvatarRepository avatarRepository){
        this.avatarRepository = avatarRepository;
    }

    @Override
    public Avatar findAvatar(Integer id) {
        return avatarRepository.findAvatarsById(id);
    }

    @Override
    public List<Avatar> getAvatars() {
        return avatarRepository.findAll();
    }

    @Modifying
    public Avatar addAvatar(Avatar avatar) {return avatarRepository.save(avatar); }


}
