package project.capstone.controller.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberResponseDto {

    private String nickname;
    private String password;

    @QueryProjection
    public MemberResponseDto(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }
}
