package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Data
@Entity
@Table(name = "AVATARS")
public class Avatar {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Email
    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "PIC", nullable = false)
    private String pic;

    @Column(name = "BANK_ACCOUNT")
    private String bankAccount;

    @Transient
    private int total;

    @Transient
    private int unPaid;
}
