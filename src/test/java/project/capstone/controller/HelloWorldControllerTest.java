package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class HelloWorldControllerTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void test() {

        List<Member> members = memberRepository.findAll();

        members.stream().forEach(m -> System.out.println("m = " + m.getName()));
    }

    @Test
    @Rollback(value = false)
    public void initDB() {
        memberRepository.save(new Member("admin1", "name1","nickname1", "password1", "010-1111-2222", "test@naver.com"));
        memberRepository.save(new Member("admin2", "name2", "nickname2", "password2", "010-1111-3333", "test@naver.com"));
    }
}