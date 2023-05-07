package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.capstone.controller.dto.SignInDto;
import project.capstone.controller.dto.SignInRequestDto;
import project.capstone.controller.dto.SignUpRequestDto;
import project.capstone.controller.dto.SignUpResponseDto;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;
import project.capstone.service.MemberService;

// @CrossOrigin(origins = "*")
@Controller
@RequiredArgsConstructor
public class HelloWorldController {

    private final MemberService memberService;

    /**
     *  login
     * @param
     * nickname, pw
     * @return
     * nickname, pw
     */
    @PostMapping("/authentication/sign-in")
    @ResponseBody
    public SignInDto login(@RequestBody SignInRequestDto param) {
        return memberService.signIn(param);
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
    public SignUpResponseDto signUp(@RequestBody SignUpRequestDto param) {
        System.out.println("param = " + param.getSu_nickname());
        System.out.println("param.getSu_adminId() = " + param.getSu_adminId());
        return memberService.signUp(param);
    }

    @GetMapping("/authentication/sign-in")
    public String test() {
        return "redirect:/";
    }


}
