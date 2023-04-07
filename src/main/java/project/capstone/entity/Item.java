package project.capstone.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Item {

    @Id @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    private String identifier;
    private String imSize;
    private String imDate;  // 사진 찍힌 날짜
    private String resolution;
    private String depth;

    @Enumerated(EnumType.STRING)
    private AdminCheck adCheck;
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
    @Enumerated(EnumType.STRING)
    private ItemDefect defect;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Box> boxes = new ArrayList<>();
}
