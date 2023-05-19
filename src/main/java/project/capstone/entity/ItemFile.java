package project.capstone.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(
        name = "ITEMFILE_SEQ_GENERATOR",
        sequenceName = "FILE_SEQ"
)
public class ItemFile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String originalFilename;
    private String storeFilename;
    @Enumerated(EnumType.STRING)
    private ItemFileType itemFileType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @Builder
    public ItemFile(Long id, String originalFilename, String storeFilename, ItemFileType itemFileType) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.storeFilename = storeFilename;
        this.itemFileType = itemFileType;
    }
}
