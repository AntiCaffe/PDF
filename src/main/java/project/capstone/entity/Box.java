package project.capstone.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Box {

    @Id @GeneratedValue
    @Column(name = "box_id")
    private Long id;

    private String type;
    private String boxcorners;
    private String ansize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

}
