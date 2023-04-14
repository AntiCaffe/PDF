package project.capstone.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberResponseDto {

    private String nickname;
    private String pw;

    public MemberResponseDto(String nickname, String pw) {
        this.nickname = nickname;
        this.pw = pw;
    }
}
