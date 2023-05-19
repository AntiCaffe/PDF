package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDto {

    private Long itemId;
    private String content;

    @Builder
    public CommentDto(Long itemId, String content) {
        this.itemId = itemId;
        this.content = content;
    }
}
