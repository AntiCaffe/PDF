package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.capstone.entity.Box;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class DashboardDto {

    private String name;
    private String identifier;
    private String imSize;
    private String imDate;  // 사진 찍힌 날짜
    private String resolution;
    private String depth;
    private String imageUrl;
    private List<BoxDto> boxes = new ArrayList<>();

    @Builder
    public DashboardDto(String name, String identifier, String imSize, String imDate, String resolution, String depth, String imageUrl) {
        this.name = name;
        this.identifier = identifier;
        this.imSize = imSize;
        this.imDate = imDate;
        this.resolution = resolution;
        this.depth = depth;
        this.imageUrl = imageUrl;
    }

    public void addBox(BoxDto boxDto) {
        this.boxes.add(boxDto);
    }
}
