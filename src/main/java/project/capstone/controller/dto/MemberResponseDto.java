package project.capstone.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberResponseDto {

    private String nickname;
    private String password;

    public MemberResponseDto(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }
}
