package project.capstone.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @NotNull
    private String adminId;
    @NotNull
    private String name;
    @NotNull
    private String nickname;
    @NotNull
    private String password;
    private String phone;
    private String email;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    public Member(String adminId, String name, String nickname, String password, String phone, String email) {
        this.adminId = adminId;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.phone = phone;
        this.email = email;
    }
}
