package project.capstone.controller.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateMemberVo {
    private String nickname;
    private String email;
    private String phone;
}
