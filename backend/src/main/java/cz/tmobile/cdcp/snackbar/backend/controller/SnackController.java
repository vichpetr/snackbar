package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.service.SnackService;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@Slf4j

public class SnackController {
    SnackService snackService;

    @Autowired
    public SnackController(SnackService SnackService){
        this.snackService = SnackService;
    }

    @PostMapping("/api/snack")
    @CrossOrigin
    public Snack findSnack(@RequestBody Search search) {
        Snack foundSnack = snackService.findSnack(search.id);

        return foundSnack;
    }

    @PostMapping("/api/snack/all")
    @CrossOrigin
    public List<Snack> getSnacks() {

        List<Snack> foundSnacks = snackService.getSnacks();

        return foundSnacks;
    }

    @PostMapping("/api/snack/add")
    @CrossOrigin
    public Snack addSnack(@RequestBody Snack snack) {

        Snack addedSnack = snackService.addSnack(snack);

        return addedSnack;
    }


}
