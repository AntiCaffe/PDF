package project.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.capstone.controller.dto.MemberResponseDto;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class HelloWorldController {

    @Autowired
    MemberRepository memberRepository;

    @PostMapping("/authentication/sign-in")
    public MemberResponseDto login(@RequestBody final MemberResponseDto param) {
        String nickname = param.getNickname();
        String password = param.getPassword();

        MemberResponseDto member = memberRepository.findByNicknameAndPassword(nickname, password);

        return member;
    }
    @GetMapping("/test/members")
    public List<Member> memberList() {
        return memberRepository.findAll();
    }
}