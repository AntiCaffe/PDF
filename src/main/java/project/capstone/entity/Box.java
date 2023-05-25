package project.capstone.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Box extends BaseEntity{

    @Id @GeneratedValue
    @Column(name = "box_id")
    private Long id;

    private String xmin;
    private String ymin;
    private String xmax;
    private String ymax;
    private String confidence;
    private Integer typeClass;
    private String typeName;
    private Boolean defect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
    @Builder
    public Box(String xmin, String ymin, String xmax, String ymax, String confidence, Integer typeClass, String typeName) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
        this.confidence = confidence;
        this.typeClass = typeClass;
        this.typeName = typeName;
        this.defect = false;
    }

    public void setItem(Item item) {
        this.item = item;
        item.getBoxes().add(this);
    }

    public void changeDefect() {
        this.defect = true;
    }
}
