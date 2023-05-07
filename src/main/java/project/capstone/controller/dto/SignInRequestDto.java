package project.capstone.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignInRequestDto {

    private String nickname;
    private String pw;

    public SignInRequestDto(String nickname, String pw) {
        this.nickname = nickname;
        this.pw = pw;
    }
}
