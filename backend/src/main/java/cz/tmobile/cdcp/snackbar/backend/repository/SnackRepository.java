package cz.tmobile.cdcp.snackbar.backend.repository;

import cz.tmobile.cdcp.snackbar.backend.model.Snack;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SnackRepository extends CrudRepository<Snack, Integer> {
    Snack findSnacksById(Integer id);
    List<Snack> findAll();
}