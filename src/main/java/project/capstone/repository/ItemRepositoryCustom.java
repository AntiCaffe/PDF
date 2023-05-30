package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.repository.querydsl.ItemWithBoxDto;

import java.util.List;

public interface ItemRepositoryCustom {
    List<ItemWithBoxDto> findByItemId(Long id);
}
