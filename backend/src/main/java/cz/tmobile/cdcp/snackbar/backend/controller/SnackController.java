package cz.tmobile.cdcp.snackbar.backend.controller;

import cz.tmobile.cdcp.snackbar.backend.model.Search;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.SnackDto;
import cz.tmobile.cdcp.snackbar.backend.service.SnackService;
import cz.tmobile.cdcp.snackbar.backend.utils.SnackUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(path = "/api/snack")
public class SnackController {

    @Autowired
    private SnackService snackService;

    @Autowired
    private SnackUtils snackUtils;

    @PostMapping(path = "/search")
    @CrossOrigin
    public SnackDto findSnack(@RequestBody Search search) {
        Snack snack = snackService.findSnack(search.id);
        return snackUtils.toDto(snack);
    }

    @GetMapping(path = "/{id}")
    public SnackDto getSnack(@PathVariable("id") Integer id){
        Snack snack = this.snackService.findSnack(id);
        return snackUtils.toDto(snack);
    }

    @GetMapping
    @CrossOrigin
    public List<SnackDto> getSnacks() {
        return snackService.getSnacks().stream()
                .map(snackUtils::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    @CrossOrigin
    public SnackDto addSnack(@RequestBody SnackDto dto, @RequestHeader("owner") Integer ownerId) {
        Snack snack = snackService.addSnack(dto, ownerId);
        return snackUtils.toDto(snack);
    }

    @GetMapping(path = "/{id}/transactions")
    public List<ExpandedTransaction> getTransactionsForSnack(@PathVariable("id") Integer id) {
        return this.snackService.findAllTransactions(id);
    }

}
