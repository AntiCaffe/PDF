package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.ItemFile;

public interface ItemFileRepository extends JpaRepository<ItemFile, Long> {
}
