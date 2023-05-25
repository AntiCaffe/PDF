package project.capstone.data;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.entity.Box;
import project.capstone.entity.Item;
import project.capstone.repository.BoxRepository;
import project.capstone.repository.ItemRepository;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class InitDBTest {

    @Autowired
    BoxRepository boxRepository;
    @Autowired
    ItemRepository itemRepository;

    public InitDBTest() {
    }

    @Test
    public void jsonTest() throws IOException, ParseException {
        String filePath = "/Users/kimyuseong/study/capstoneV2/src/main/resources/sampleData/json_files/TM-A_Chassis_MULT_1_O.json";
        FileReader reader = new FileReader(filePath);
        JSONParser parser = new JSONParser();
        JSONArray array = (JSONArray) parser.parse(reader);

        for (Object o : array) {
            JSONObject object = (JSONObject) o;
            Double xmin = (Double) object.get("xmin");
            log.info("result={}", xmin);
        }
    }

    @Test
    public void boxNameTest() {
        Item item = itemRepository.findById(12L).get();
        List<Box> boxes = item.getBoxes();
        for (Box box : boxes) {
            log.info(box.getTypeName().substring(0,6));
            log.info(String.valueOf(box.getTypeName().substring(0,6).equals("Defect")));
        }
    }
}