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

    }
}