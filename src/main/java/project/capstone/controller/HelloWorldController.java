package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.capstone.controller.dto.MemberResponseDto;
import project.capstone.controller.dto.MemberSignUpDto;
import project.capstone.controller.dto.SignUpResponseDto;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;
import project.capstone.service.MemberService;

// @CrossOrigin(origins = "*")
@Controller
@RequiredArgsConstructor
public class HelloWorldController {

    @Autowired
    MemberRepository memberRepository;

    private final MemberService memberService;

    @PostMapping("/authentication/sign-in")
    @ResponseBody
    public Member login(@RequestBody MemberResponseDto param) {
        String nickname = param.getNickname();
        String password = param.getPw();

        System.out.println("nickname = " + nickname);
        System.out.println("password = " + password);

        Member member = memberRepository.findByNicknameAndPassword(nickname, password);

        if (member != null)
            return member;
        else
            return new Member();
    }

    /**
     * nickname : su_id,
     * pw : su_pw,
     * admin : su_ad,
     * email : su_email,
     * phone : su_phone
     * @return
     */
    @PostMapping("/authentication/sign-up")
    @ResponseBody
    public SignUpResponseDto signUp(@RequestBody MemberSignUpDto param) {
        System.out.println("param = " + param.getSu_nickname());
        System.out.println("param.getSu_adminId() = " + param.getSu_adminId());
        return memberService.signUp(param);
    }

    @GetMapping("/authentication/sign-in")
    public String test() {
        return "redirect:/";
    }


}
