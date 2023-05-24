package project.capstone.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.entity.Box;
import project.capstone.entity.Item;
import project.capstone.repository.ItemRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
@Transactional
class ItemServiceTest {

    @Autowired
    private ItemRepository itemRepository;

    public ItemServiceTest() {

    }

    @Test
    public void itemListTest() {
        List<Item> items = itemRepository.findAll();
        for (Item item : items) {
            List<Box> boxes = item.getBoxes();
            for (Box box : boxes) {
                log.info("result={}", box.getTypeName());
            }
        }
    }
}