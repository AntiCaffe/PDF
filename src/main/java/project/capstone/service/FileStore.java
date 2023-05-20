package project.capstone.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.entity.ItemFile;
import project.capstone.entity.ItemFileType;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileStore {

    @Value("${file.dir}/")
    private String fileDirPath;

    public String createPath(String storeFilename, ItemFileType itemFileType) {
        String viaPath = (itemFileType == ItemFileType.IMAGE) ? "images/" : "generals/";
        return fileDirPath + viaPath + storeFilename;
    }

    public ItemFile storeFile(MultipartFile multipartFile, ItemFileType itemFileType) throws IOException {
        if(multipartFile.isEmpty())
            return null;

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFilename(originalFilename);
        multipartFile.transferTo(new File(createPath(storeFilename, itemFileType)));

        return ItemFile.builder()
                .originalFilename(originalFilename)
                .storeFilename(storeFilename)
                .itemFileType(itemFileType)
                .build();
    }

    public List<ItemFile> storeFiles(List<MultipartFile> multipartFiles, ItemFileType itemFileType) throws IOException {
        List<ItemFile> itemFiles = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                itemFiles.add(storeFile(multipartFile, itemFileType));
            }
        }
        return itemFiles;
    }

    private String extractExt(String originalFilename) {
        int idx = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(idx);
        return ext;
    }

    private String createStoreFilename(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalFilename);
        String storeFilename = uuid + ext;
        return storeFilename;
    }

}
