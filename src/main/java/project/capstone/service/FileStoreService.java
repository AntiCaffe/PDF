package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.entity.ItemFile;
import project.capstone.entity.ItemFileType;
import project.capstone.repository.ItemFileRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileStoreService {

    private final ItemFileRepository itemFileRepository;
    private final FileStore fileStore;

    public List<ItemFile> saveItemFiles(Map<ItemFileType, List<MultipartFile>> multipartFileListMap) throws IOException {
        List<ItemFile> imageFiles = fileStore.storeFiles(multipartFileListMap.get(ItemFileType.IMAGE), ItemFileType.IMAGE);
        List<ItemFile> generalFiles = fileStore.storeFiles(multipartFileListMap.get(ItemFileType.GENERAL), ItemFileType.GENERAL);
        List<ItemFile> result = Stream.of(imageFiles, generalFiles)
                .flatMap(f -> f.stream())
                .collect(Collectors.toList());

        return result;
    }

    public Map<ItemFileType, List<ItemFile>> findItemFiles() {
        List<ItemFile> itemFiles = itemFileRepository.findAll();
        Map<ItemFileType, List<ItemFile>> result = itemFiles.stream()
                .collect(Collectors.groupingBy(ItemFile::getItemFileType));

        return result;
    }

    public ItemFile saveItemFile(ItemFileType itemFileType, MultipartFile multipartFile) throws IOException {
        ItemFile itemFile = fileStore.storeFile(multipartFile, itemFileType);
        return itemFile;
    }
}
