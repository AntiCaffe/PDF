package project.capstone.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.capstone.controller.dto.ProfileDto;
import project.capstone.controller.vo.UpdateMemberVo;
import project.capstone.controller.vo.UpdatePwVo;
import project.capstone.service.ProfileService;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @ApiOperation(value = "사용자 정보 조회 컨트롤러")
    @ResponseBody
    @GetMapping("/{nickname}")
    public ProfileDto profile(@PathVariable("nickname") String nickname) {
        ProfileDto profileDto = profileService.searchProfile(nickname);
        System.out.println("profileDto = " + profileDto);
        return profileDto;
    }

    @ResponseBody
    @PostMapping("/updatePW")
    public ProfileDto updatePW(@RequestBody UpdatePwVo vo) {
        return profileService.updatePW(vo.getNickname(), vo.getPw());
    }

    @ResponseBody
    @PostMapping("/updateMember")
    public ProfileDto updateMember(@RequestBody UpdateMemberVo vo) {
        return profileService.updateMember(vo);
    }

    @ResponseBody
    @GetMapping("/delete/{nickname}")
    public void deleteMember(@PathVariable("nickname") String nickname) {
        profileService.deleteMember(nickname);
    }
}
