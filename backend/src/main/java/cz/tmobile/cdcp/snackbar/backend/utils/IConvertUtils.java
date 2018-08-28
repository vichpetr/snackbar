package cz.tmobile.cdcp.snackbar.backend.utils;

import org.springframework.hateoas.ResourceSupport;

public interface IConvertUtils<D extends ResourceSupport,E> {

    D toDto(E entity);
    E toEntity(D dto);
}
