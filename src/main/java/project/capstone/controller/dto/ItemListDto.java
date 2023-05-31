package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ItemListDto {

    private String name;
    private Boolean defective;

    @Builder
    public ItemListDto(String name, Boolean defective) {
        this.name = name;
        this.defective = defective;
    }
}
