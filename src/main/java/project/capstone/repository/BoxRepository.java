package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Box;

public interface BoxRepository extends JpaRepository<Box, Long> {
}
