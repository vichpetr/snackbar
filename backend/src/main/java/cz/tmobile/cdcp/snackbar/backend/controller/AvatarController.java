package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.model.dto.AvatartDto;
import cz.tmobile.cdcp.snackbar.backend.service.AvatarService;
import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.utils.AvatarUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "/api/avatar")
public class AvatarController {

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private AvatarUtils avatarUtils;

    @PostMapping("/search")
    @CrossOrigin
    public Avatar findAvatar(@RequestBody Search search) {
        return avatarService.findAvatar(search.id);
    }

    @GetMapping
    @CrossOrigin
    public List<Avatar> getAvatars() {
        return avatarService.getAvatars();
    }

    @PostMapping
    @CrossOrigin
    public Avatar addAvatar(@RequestBody Avatar avatar) {
        return avatarService.addAvatar(avatar);
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public AvatartDto getAvatar(@PathVariable("id") Integer id) {
        Avatar entity = this.avatarService.findAvatar(id);
        return avatarUtils.toDto(entity);
    }
}
