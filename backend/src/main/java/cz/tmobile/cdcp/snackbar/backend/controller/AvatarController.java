package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.service.AvatarService;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@Slf4j

public class AvatarController {
    AvatarService avatarService;

    @Autowired
    public AvatarController(AvatarService avatarService){
        this.avatarService = avatarService;
    }

    @PostMapping("/api/avatar")
    @CrossOrigin
    public Avatar findAvatar(@RequestBody Search search) {
        Avatar foundAvatar = avatarService.findAvatar(search.id);

        return foundAvatar;
    }

    @PostMapping("/api/avatar/all")
    @CrossOrigin
    public List<Avatar> getAvatars(@RequestBody Search search) {

        List<Avatar> foundAvatars = avatarService.getAvatars();

        return foundAvatars;
    }

    @PostMapping("/api/avatar/add")
    @CrossOrigin
    public Avatar addAvatar(@RequestBody Avatar avatar) {

        Avatar addedAvatar = avatarService.addAvatar(avatar);

        return addedAvatar;
    }



}
