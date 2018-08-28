package cz.tmobile.cdcp.snackbar.backend.service.impl;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.model.dto.ExpandedTransaction;
import cz.tmobile.cdcp.snackbar.backend.model.dto.SnackDto;
import cz.tmobile.cdcp.snackbar.backend.repository.SnackRepository;
import cz.tmobile.cdcp.snackbar.backend.service.AvatarService;
import cz.tmobile.cdcp.snackbar.backend.service.SnackService;
import cz.tmobile.cdcp.snackbar.backend.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class SnackServiceImpl implements SnackService {

    private SnackRepository snackRepository;

    private AvatarService avatarService;


    @Override
    public Snack findSnack(Integer id) {
        return snackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Snack with id " + id +" not found."));
    }

    @Override
    public List<Snack> getSnacks() {
        return snackRepository.findAll();
    }

    private Snack toEntity(SnackDto dto, Integer ownerId){
        Avatar avatar = avatarService.findAvatar(ownerId);

        Snack snack = new Snack();
        snack.setName(dto.getName());
        snack.setPrice(dto.getPrice());
        snack.setPic(dto.getPic());
        snack.setPictype(dto.getPictype());
        snack.setOwner(avatar);

        return snack;
    }

    @Override
    public Snack addSnack(SnackDto dto, Integer ownerId) {
        Snack snack = this.toEntity(dto, ownerId);
        return snackRepository.save(snack);
    }

    @Override
    public List<ExpandedTransaction> findAllTransactions(Integer id) {
        return null;
    }
}