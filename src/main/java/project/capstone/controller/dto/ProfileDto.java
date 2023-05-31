package project.capstone.controller.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ProfileDto {

    private String memberId;
    private String name;
    private String nickname;
    private String pw;
    private String phone;
    private String email;
    private String adminId;

    @Builder
    public ProfileDto(String memberId, String name, String nickname, String pw, String phone, String email, String adminId) {
        this.memberId = memberId;
        this.name = name;
        this.nickname = nickname;
        this.pw = pw;
        this.phone = phone;
        this.email = email;
        this.adminId = adminId;
    }
}
