package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
    public Long saveItem(String data, MultipartFile file) throws IOException, ParseException {
        Item item = Item.builder()
                .name(file.getOriginalFilename().substring(0,file.getOriginalFilename().lastIndexOf(".")))
                .identifier("test_identifier")
                .imSize("test_imSize")
                .imDate("test_imDate")
                .resolution("test_resolution")
                .depth("test_depth")
                .build();
        Item savedItem = itemRepository.save(item);
        Boolean defective = item.getDefective();
        List<BoxDto> boxes = parsingStringFile(data);
        for (BoxDto dto : boxes) {
            Box box = Box.builder()
                    .xmin(dto.getXmin())
                    .ymin(dto.getYmin())
                    .xmax(dto.getXmax())
                    .ymax(dto.getYmax())
                    .confidence(dto.getConfidence())
                    .typeClass(dto.getTypeClass())
                    .typeName(dto.getTypeName())
                    .build();
            if (box.getTypeName().substring(0, 6).equals("Defect")) {
                box.changeDefect();
                if(!defective) item.changeDefective();
            }
            box.setItem(item);
            boxRepository.save(box);
        }
        if (!file.isEmpty()) {
            String savedFileName = s3UploaderService.upload(file, "images");
            item.setImageUrl(savedFileName);
        }
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
                    .defective(item.getDefective())
                    .build();
            List<Box> boxes = item.getBoxes();
            for (Box box : boxes) {
                dto.addBox(BoxDto.builder()
                        .xmin(box.getXmin())
                        .ymin(box.getYmin())
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

    public DashboardDto findOneItem(String name) {
        Item item = itemRepository.findByName(name);

        DashboardDto result = DashboardDto.builder()
                .name(item.getName())
                .identifier(item.getIdentifier())
                .imSize(item.getImSize())
                .imDate(item.getImDate())
                .resolution(item.getResolution())
                .depth(item.getDepth())
                .imageUrl(item.getImageUrl())
                .defective(item.getDefective())
                .build();

        List<Box> boxes = item.getBoxes();
        for (Box box : boxes) {
            result.addBox(BoxDto.builder()
                    .xmin(box.getXmin())
                    .ymin(box.getYmin())
                    .xmax(box.getXmax())
                    .ymax(box.getYmax())
                    .confidence(box.getConfidence())
                    .typeClass(box.getTypeClass())
                    .typeName(box.getTypeName())
                    .build());
        }
        return result;
    }

    private List<BoxDto> parsingStringFile(String data) throws ParseException {
        List<BoxDto> result = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONArray array = (JSONArray) parser.parse(data);
        for (Object o : array) {
            JSONObject object = (JSONObject) o;
            result.add(BoxDto.builder()
                    .xmin(object.get("xmin").toString())
                    .ymin(object.get("ymin").toString())
                    .xmax(object.get("xmax").toString())
                    .ymax(object.get("ymax").toString())
                    .confidence(object.get("confidence").toString())
                    .typeClass(Integer.parseInt(String.valueOf(object.get("class"))))
                    .typeName(object.get("name").toString())
                    .build());
        }
        return result;
    }
}
