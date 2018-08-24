package cz.tmobile.cdcp.snackbar.backend.repository;

import cz.tmobile.cdcp.snackbar.backend.model.Avatar;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AvatarRepository extends CrudRepository<Avatar, Integer> {
    Avatar findAvatarsById(Integer id);
    List<Avatar> findAll();
}
