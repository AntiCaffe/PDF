package project.capstone.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignUpRequestDto {

    private String su_name;
    private String su_nickname;
    private String su_password;
    private String su_phone;
    private String su_email;
    private String su_adminId;

    public SignUpRequestDto(String su_name, String su_nickname, String su_password, String su_phone, String su_email, String su_adminId) {
        this.su_name = su_name;
        this.su_nickname = su_nickname;
        this.su_password = su_password;
        this.su_phone = su_phone;
        this.su_email = su_email;
        this.su_adminId = su_adminId;
    }


}
