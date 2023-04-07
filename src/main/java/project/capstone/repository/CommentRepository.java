package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
