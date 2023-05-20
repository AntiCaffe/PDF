package project.capstone.entity;

import lombok.AccessLevel;
import lombok.Builder;
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
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private AdminCheck adCheck;
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
    @Enumerated(EnumType.STRING)
    private ItemDefect defect;


    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private Comment comment;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Box> boxes = new ArrayList<>();

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private ItemFile itemFile;

    @Builder
    public Item(String identifier, String imSize, String imDate, String imageUrl, String resolution, String depth, AdminCheck adCheck, ItemType itemType, ItemDefect defect) {
        this.identifier = identifier;
        this.imSize = imSize;
        this.imDate = imDate;
        this.resolution = resolution;
        this.depth = depth;
        this.adCheck = adCheck;
        this.itemType = itemType;
        this.defect = defect;
    }

    public void setImageUrl(String url) {
        this.imageUrl = url;
    }
}
