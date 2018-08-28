package cz.tmobile.cdcp.snackbar.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Snack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner")
    private Avatar owner;

    private String pictype;

    private String pic;
}
