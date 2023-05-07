package project.capstone.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.SignUpRequestDto;
import project.capstone.entity.Admin;
import project.capstone.repository.AdminRepository;
import project.capstone.repository.MemberRepository;

import java.util.List;

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

        SignUpRequestDto signUpRequestDto1 = new SignUpRequestDto("name1", "nickname1", "1234", "01011112222", "test@naver.com", admins.get(0).getAdminId());
        SignUpRequestDto signUpRequestDto2 = new SignUpRequestDto("name2", "nickname2", "1234", "01011112222", "test2@naver.com", admins.get(1).getAdminId());
        SignUpRequestDto signUpRequestDto3 = new SignUpRequestDto("name3", "nickname3", "1234", "01011112222", "test3@naver.com", "admin3");

        memberService.signUp(signUpRequestDto1);
        memberService.signUp(signUpRequestDto2);
        memberService.signUp(signUpRequestDto3);


    }
}