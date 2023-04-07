package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
