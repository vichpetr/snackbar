package cz.tmobile.cdcp.snackbar.backend.service;

import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import cz.tmobile.cdcp.snackbar.backend.repository.SnackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnackServiceImpl implements SnackService{
    private final SnackRepository snackRepository;

    @Autowired
    public SnackServiceImpl(SnackRepository snackRepository){
        this.snackRepository = snackRepository;
    }

    @Override
    public Snack findSnack(Integer id) {
        return snackRepository.findSnacksById(id);
    }

    @Override
    public List<Snack> getSnacks() {
        return snackRepository.findAll();
    }

    @Modifying
    public Snack addSnack(Snack snack) {return snackRepository.save(snack); }
}