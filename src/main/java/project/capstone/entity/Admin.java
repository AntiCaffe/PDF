package project.capstone.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Admin extends BaseEntity{

    @Id
    @GeneratedValue
    @Column(name = "ad_id")
    private Long id;

    @Column(unique = true)
    private String adminId;

    @Enumerated(EnumType.STRING)
    private SignCheck signCheck;


    @OneToOne(mappedBy = "admin")
    private Member member;

    public Admin(String adminId) {
        this.adminId = adminId;
        this.signCheck = SignCheck.AVAILABLE;
    }

    public void setSigned() {
        this.signCheck = SignCheck.SIGNED;
    }
    public void setUnsigned() {
        this.signCheck = SignCheck.AVAILABLE;
    }
}
