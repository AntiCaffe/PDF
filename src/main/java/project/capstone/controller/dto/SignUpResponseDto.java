package project.capstone.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpResponseDto {
     String su_nickname;
     String su_adminId;

    public SignUpResponseDto(String su_nickname, String su_adminId) {
        this.su_nickname = su_nickname;
        this.su_adminId = su_adminId;
    }
}
