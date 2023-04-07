package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
