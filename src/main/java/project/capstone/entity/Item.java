package project.capstone.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Item extends BaseEntity{

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

    public Item(String identifier, String imSize, String imDate, String resolution, String depth, AdminCheck adCheck, ItemType itemType, ItemDefect defect) {
        this.identifier = identifier;
        this.imSize = imSize;
        this.imDate = imDate;
        this.resolution = resolution;
        this.depth = depth;
        this.adCheck = adCheck;
        this.itemType = itemType;
        this.defect = defect;
    }
}
