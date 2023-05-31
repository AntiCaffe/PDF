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

    private String name;
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
    private Boolean defective;




    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Box> boxes = new ArrayList<>();

    @Builder
    public Item(String name, String identifier, String imSize, String imDate, String resolution, String depth, ItemType itemType) {
        this.name = name;
        this.identifier = identifier;
        this.imSize = imSize;
        this.imDate = imDate;
        this.resolution = resolution;
        this.depth = depth;
        this.itemType = itemType;
        this.adCheck = AdminCheck.NOT_CHECK;
        this.defective = false;
    }

    public void setImageUrl(String url) {
        this.imageUrl = url;
    }

    public void setItemName(String name) {
        this.name = name;
    }

    public void changeDefective() {
        this.defective = true;
    }
}
