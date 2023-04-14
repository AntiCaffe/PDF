package project.capstone.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import project.capstone.controller.dto.MemberResponseDto;
import project.capstone.controller.dto.QMemberResponseDto;
import project.capstone.entity.QMember;

import javax.persistence.EntityManager;

import static project.capstone.entity.QMember.*;

public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public MemberResponseDto findByNicknameAndPassword(String nickname, String password) {
        return queryFactory
                .select(new QMemberResponseDto(member.nickname, member.password))
                .from(member)
                .where(member.nickname.eq(nickname).and(member.password.eq(password)))
                .fetchOne();
    }
}
