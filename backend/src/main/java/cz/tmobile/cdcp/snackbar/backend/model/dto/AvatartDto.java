package cz.tmobile.cdcp.snackbar.backend.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.hateoas.ResourceSupport;

@Data
@Builder
@EqualsAndHashCode(callSuper = true)
public class AvatartDto extends ResourceSupport {

    private Integer entityId;
    private String name;
    private String email;
    private String pictype;
    private String pic;
}
