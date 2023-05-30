package project.capstone.repository.querydsl;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.capstone.entity.AdminCheck;
import project.capstone.entity.ItemType;

@Data
@NoArgsConstructor
public class ItemWithBoxDto {

    private String name;
    private String imageUrl;
    private AdminCheck adminCheck;
    private ItemType itemType;
    private Boolean defective;

    private String xmin;
    private String ymin;
    private String xmax;
    private String ymax;
    private String confidence;
    private Integer typeClass;
    private String typeName;
    private Boolean defect;

    @QueryProjection
    public ItemWithBoxDto(String name, String imageUrl, AdminCheck adminCheck, ItemType itemType, Boolean defective, String xmin, String ymin, String xmax, String ymax, String confidence, Integer typeClass, String typeName, Boolean defect) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.adminCheck = adminCheck;
        this.itemType = itemType;
        this.defective = defective;
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
        this.confidence = confidence;
        this.typeClass = typeClass;
        this.typeName = typeName;
        this.defect = defect;
    }
}
