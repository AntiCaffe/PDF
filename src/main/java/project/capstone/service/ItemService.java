package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.controller.dto.BoxDto;
import project.capstone.controller.dto.DashboardDto;
import project.capstone.controller.dto.NewItemDto;
import project.capstone.entity.Box;
import project.capstone.entity.Item;
import project.capstone.repository.BoxRepository;
import project.capstone.repository.ItemRepository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final S3UploaderService s3UploaderService;
    private final ItemRepository itemRepository;
    private final BoxRepository boxRepository;

    @Transactional
    public Long saveItem(NewItemDto newItemDto, MultipartFile file) throws IOException {
        Item item = Item.builder()
                .identifier(newItemDto.getIdentifier())
                .imSize(newItemDto.getImSize())
                .imDate(newItemDto.getImDate())
                .resolution(newItemDto.getResolution())
                .depth(newItemDto.getDepth())
                .itemType(newItemDto.getItemType())
                .build();
        if (!file.isEmpty()) {
            String savedFileName = s3UploaderService.upload(file, "images");
            item.setImageUrl(savedFileName);
        }
        Item savedItem = itemRepository.save(item);
        return savedItem.getId();
    }

    @Transactional
    public Long saveItem(NewItemDto newItemDto, File file) throws IOException {
        Item item = Item.builder()
                .name(newItemDto.getName())
                .identifier(newItemDto.getIdentifier())
                .imSize(newItemDto.getImSize())
                .imDate(newItemDto.getImDate())
                .resolution(newItemDto.getResolution())
                .depth(newItemDto.getDepth())
                .itemType(newItemDto.getItemType())
                .build();
        if (true) {
            String savedFileName = s3UploaderService.upload(file, "images");
            item.setImageUrl(savedFileName);
            System.out.println("saved Success!!");
        }
        Item savedItem = itemRepository.save(item);
        return savedItem.getId();
    }

    public List<DashboardDto> itemList() {
        List<DashboardDto> result = new ArrayList<>();
        List<Item> items = itemRepository.findAll();

        for (Item item : items) {
            DashboardDto dto = DashboardDto.builder()
                    .name(item.getName())
                    .identifier(item.getIdentifier())
                    .imSize(item.getImSize())
                    .imDate(item.getImDate())
                    .resolution(item.getResolution())
                    .depth(item.getDepth())
                    .imageUrl(item.getImageUrl())
                    .build();
            List<Box> boxes = item.getBoxes();
            for (Box box : boxes) {
                dto.addBox(BoxDto.builder()
                        .xmin(box.getXmin())
                        .ymin(box.getXmin())
                        .xmax(box.getXmax())
                        .ymax(box.getYmax())
                        .confidence(box.getConfidence())
                        .typeClass(box.getTypeClass())
                        .typeName(box.getTypeName())
                        .build());
            }
            result.add(dto);
        }
        return result;
    }
}
