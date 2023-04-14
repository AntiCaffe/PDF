package project.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.capstone.controller.dto.MemberResponseDto;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;

// @CrossOrigin(origins = "*")
@Controller
public class HelloWorldController {

    @Autowired
    MemberRepository memberRepository;

    @PostMapping("/authentication/sign-in")
    @ResponseBody
    public Member login(@RequestBody MemberResponseDto param) {
        String nickname = param.getNickname();
        String password = param.getPw();

        System.out.println("nickname = " + nickname);
        System.out.println("password = " + password);

        Member member = memberRepository.findByNicknameAndPassword(nickname, password);

        if(member != null)
            return member;
        else
            return new Member();
    }

    @GetMapping("/authentication/sign-in")
    public String test() {
         return "redirect:/";
    }
}

