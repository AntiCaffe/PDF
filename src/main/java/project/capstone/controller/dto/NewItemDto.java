package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.capstone.entity.AdminCheck;
import project.capstone.entity.ItemDefect;
import project.capstone.entity.ItemType;

@Data
@NoArgsConstructor
public class NewItemDto {
    private String identifier;
    private String imSize;
    private String imDate;
    private String resolution;
    private String depth;
    private AdminCheck adminCheck;
    private ItemType itemType;
    private ItemDefect defect;

    @Builder
    public NewItemDto(String identifier, String imSize, String imDate, String resolution, String depth) {
        this.identifier = identifier;
        this.imSize = imSize;
        this.imDate = imDate;
        this.resolution = resolution;
        this.depth = depth;
    }
}
