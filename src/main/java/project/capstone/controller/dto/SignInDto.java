package project.capstone.controller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignInDto {

    private String nickname;
    private String pw;

    public SignInDto(String nickname, String pw) {
        this.nickname = nickname;
        this.pw = pw;
    }
}
