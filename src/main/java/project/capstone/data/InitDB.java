package project.capstone.data;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.NewItemDto;
import project.capstone.entity.Admin;
import project.capstone.entity.Box;
import project.capstone.entity.Item;
import project.capstone.repository.AdminRepository;
import project.capstone.repository.BoxRepository;
import project.capstone.repository.ItemRepository;
import project.capstone.service.ItemService;
import project.capstone.service.S3UploaderService;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class InitDB {

    private final initAdmin initAdmin;
    private final initItem initItem;

//    @PostConstruct
    @Transactional
    public void init() throws IOException, ParseException {
        initAdmin.create10AdminId();
        initItem.saveImages();
        initItem.saveBoxes();
    }

    @Component
    @RequiredArgsConstructor
    static class initAdmin {
        private final AdminRepository adminRepository;

        public void create10AdminId() {
            for (int i = 1; i < 10; i++) {
                String generateKey = generateRandomKey();
                adminRepository.save(new Admin(generateKey));
            }
            adminRepository.save(new Admin("test_admin1"));
            adminRepository.save(new Admin("test_admin2"));
        }

        private String generateRandomKey() {
            int leftLimit = 48; // numeral '0'
            int rightLimit = 122; // letter 'z'
            int targetStringLength = 10;
            Random random = new Random();
            String generatedString = random.ints(leftLimit, rightLimit + 1)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(targetStringLength)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();
            return generatedString;
        }
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    @PropertySource("classpath:filePath.yml")
    static class initItem {
        @Value("${images}")
        private String imagesPath;
        @Value("${json_files}")
        private String jsonPath;

        private final ItemService itemService;
        private final ItemRepository itemRepository;
        private final BoxRepository boxRepository;

        public void saveImages() throws IOException{
            File[] files = new File(imagesPath).listFiles();
            for (File file : files) {
                NewItemDto newItemDto = testItemDto();
                String name = file.getName().substring(0,file.getName().lastIndexOf("."));
                newItemDto.setName(name);
                itemService.saveItem(newItemDto, file);
            }
        }

        public void saveBoxes() throws IOException, ParseException {
            List<Item> items = itemRepository.findAll();
            for (Item item : items) {
                List<Box> boxes = parsingJsonFile(item.getName());
                for (Box box : boxes) {
                    if (box.getTypeName().substring(0, 6).equals("Defect")) {
                        box.changeDefect();
                        if(!item.getDefective())
                            item.changeDefective();
                    }
                    box.setItem(item);
                    boxRepository.save(box);
                }
            }
        }

        public List<Box> parsingJsonFile(String itemName) throws IOException, ParseException {
            File[] files = new File(jsonPath).listFiles();
            JSONParser parser = new JSONParser();

            List<Box> result = new ArrayList<>();
            for (File file : files) {
                if (file.getName().substring(0, file.getName().lastIndexOf(".")).equals(itemName)) {
                    FileReader reader = new FileReader(file.getAbsolutePath());
                    JSONArray array = (JSONArray) parser.parse(reader);
                    for (Object o : array) {
                        JSONObject object = (JSONObject) o;
                        String xmin = object.get("xmin").toString();
                        String ymin =  object.get("ymin").toString();
                        String xmax =  object.get("xmax").toString();
                        String ymax =  object.get("ymax").toString();
                        String confidence = object.get("confidence").toString();
                        Integer typeClass = Integer.parseInt(String.valueOf(object.get("class")));
                        String name = (String) object.get("name");

                        result.add(Box.builder()
                                .xmin(xmin)
                                .ymin(ymin)
                                .xmax(xmax)
                                .ymax(ymax)
                                .confidence(confidence)
                                .typeClass(typeClass)
                                .typeName(name)
                                .build());
                    }
                }
            }
            return result;
        }
        public NewItemDto testItemDto() {
            return NewItemDto.builder()
                    .identifier("test_identifier")
                    .imSize("test_imSize")
                    .imDate("test_imDate")
                    .resolution("test_resolution")
                    .depth("test_depth")
                    .build();
        }

    }


}
