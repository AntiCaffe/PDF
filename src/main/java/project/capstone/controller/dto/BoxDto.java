package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoxDto {

    private String xmin;
    private String ymin;
    private String xmax;
    private String ymax;
    private String confidence;
    private Integer typeClass;
    private String typeName;

    @Builder
    public BoxDto(String xmin, String ymin, String xmax, String ymax, String confidence, Integer typeClass, String typeName) {
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
        this.confidence = confidence;
        this.typeClass = typeClass;
        this.typeName = typeName;
    }
}
