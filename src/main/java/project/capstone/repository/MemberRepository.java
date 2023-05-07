package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Member;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByNicknameAndPassword(String nickname, String password);

    List<Member> findByNickname(String nickname);
}
