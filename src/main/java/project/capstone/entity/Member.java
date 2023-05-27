package project.capstone.entity;

import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Entity
@NoArgsConstructor
@Getter
public class Member extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @NotNull
    private String name;
    @NotNull
    @Column(unique = true)
    private String nickname;
    @NotNull
    private String password;
    private String phone;
    private String email;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "ad_id")
    private Admin admin;

    public Member(String name, String nickname, String password, String phone, String email, Admin admin) {
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.admin = admin;
    }

    public void changePW(String pw) {
        this.password = pw;
    }
}
