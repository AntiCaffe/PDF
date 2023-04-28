package project.capstone.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.MemberSignUpDto;
import project.capstone.entity.Admin;
import project.capstone.entity.Member;
import project.capstone.repository.AdminRepository;
import project.capstone.repository.MemberRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class MemberServiceTest {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    AdminRepository adminRepository;

    @Test
    @Transactional
    @Rollback(false)
    public void signUp() {
        List<Admin> admins = adminRepository.findAll();

        MemberSignUpDto memberSignUpDto1 = new MemberSignUpDto("name1", "nickname1", "1234", "01011112222", "test@naver.com", admins.get(0).getAdminId());
        MemberSignUpDto memberSignUpDto2 = new MemberSignUpDto("name2", "nickname2", "1234", "01011112222", "test2@naver.com", admins.get(1).getAdminId());
        MemberSignUpDto memberSignUpDto3 = new MemberSignUpDto("name3", "nickname3", "1234", "01011112222", "test3@naver.com", "admin3");

        memberService.signUp(memberSignUpDto1);
        memberService.signUp(memberSignUpDto2);
        memberService.signUp(memberSignUpDto3);


    }
}