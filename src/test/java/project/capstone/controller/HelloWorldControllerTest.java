package project.capstone.controller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.SignUpRequestDto;
import project.capstone.controller.dto.SignUpResponseDto;
import project.capstone.entity.Admin;
import project.capstone.repository.AdminRepository;
import project.capstone.repository.MemberRepository;
import project.capstone.service.MemberService;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class HelloWorldControllerTest {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    MemberService memberService;

    @Test
    public void test() {
        List<Admin> admins = adminRepository.findAll();

        SignUpRequestDto param = new SignUpRequestDto("name1", "nickname1", "1234", "01011112222", "ivneld@naver.com", admins.get(0).getAdminId());
        SignUpResponseDto responseDto = memberService.signUp(param);
        assertThat(responseDto.getSu_nickname()).isEqualTo(param.getSu_nickname());
        assertThat(responseDto.getSu_adminId()).isEqualTo(param.getSu_adminId());

//        // 이미 가입된 admin_id
//        MemberSignUpDto param1 = new MemberSignUpDto("name1", "nickname2", "1234", "01011112222", "ivneld@naver.com", "kR2P1MOZqD");
//        SignUpResponseDto responseDto1 = memberService.signUp(param1);
//        log.info("admin_id={}, nickname={}", responseDto1.getSu_adminId(),responseDto1.getSu_nickname());
//        assertThat(responseDto1.getSu_nickname()).isEqualTo(param1.getSu_nickname());
//        assertThat(responseDto1.getSu_adminId()).isNotEqualTo(param1.getSu_adminId());

        // 중복 회원
        SignUpRequestDto param2 = new SignUpRequestDto("name1", "nickname1", "1234", "01011112222", "ivneld@naver.com", admins.get(1).getAdminId());
//        boolean b = memberService.validateAdmin(param2);
//        log.info("boolean={}",b);
//        Admin admin = adminRepository.findByAdminId(param2.getSu_adminId());
//        log.info("admin_id={}", admin.getAdminId());
        SignUpResponseDto responseDto1 = memberService.signUp(param2);
        assertThat(responseDto1.getSu_nickname()).isNull();
        assertThat(responseDto1.getSu_adminId()).isEqualTo(param2.getSu_adminId());
    }

}