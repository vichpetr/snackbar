package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;


@Entity
@Table(name = "SNACKS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Snack {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Min(0)
    @Column(name = "PRICE", nullable = false)
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private Avatar owner;

    @Column(name = "PIC", nullable = false)
    private String pic;

    @Column(name = "COUNT", nullable = false)
    private Integer count;
}
