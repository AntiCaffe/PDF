package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.controller.dto.NewItemDto;
import project.capstone.entity.Item;
import project.capstone.repository.ItemRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final S3UploaderService s3UploaderService;
    private final ItemRepository itemRepository;

    @Transactional
    public Long saveItem(NewItemDto newItemDto, MultipartFile file) throws IOException {
        Item item = Item.builder()
                .identifier(newItemDto.getIdentifier())
                .imSize(newItemDto.getImSize())
                .imDate(newItemDto.getImDate())
                .resolution(newItemDto.getResolution())
                .depth(newItemDto.getDepth())
                .adCheck(newItemDto.getAdminCheck())
                .itemType(newItemDto.getItemType())
                .defect(newItemDto.getDefect())
                .build();
        if (!file.isEmpty()) {
            String savedFileName = s3UploaderService.upload(file, "images");
            item.setImageUrl(savedFileName);
        }
        Item savedItem = itemRepository.save(item);
        return savedItem.getId();
    }
}
