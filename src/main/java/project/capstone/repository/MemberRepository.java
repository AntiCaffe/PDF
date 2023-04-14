package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.controller.dto.MemberResponseDto;
import project.capstone.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByNicknameAndPassword(String nickname, String password);
}
