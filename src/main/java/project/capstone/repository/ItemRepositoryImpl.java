package project.capstone.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import project.capstone.entity.QBox;
import project.capstone.entity.QItem;
import project.capstone.repository.querydsl.ItemWithBoxDto;
import project.capstone.repository.querydsl.QItemWithBoxDto;

import javax.persistence.EntityManager;
import java.util.List;

import static project.capstone.entity.QBox.*;
import static project.capstone.entity.QItem.*;

public class ItemRepositoryImpl implements ItemRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    public ItemRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ItemWithBoxDto> findByItemId(Long id) {
        return queryFactory.select(new QItemWithBoxDto(item.name, item.imageUrl, item.adCheck, item.itemType, item.defective
                ,box.xmin, box.ymin, box.xmax, box.ymax,box.confidence, box.typeClass, box.typeName, box.defect))
                .from(item)
                .join(box).on(item.id.eq(box.item.id))
                .where(item.id.eq(id))
                .fetch();
    }
}
