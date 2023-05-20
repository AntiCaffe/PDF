package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.controller.dto.ProfileDto;
import project.capstone.entity.ItemFile;
import project.capstone.entity.ItemFileType;
import project.capstone.service.FileStoreService;
import project.capstone.service.ProfileService;
import project.capstone.service.S3UploaderService;

import java.io.IOException;

@Controller
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final S3UploaderService s3UploaderService;
    private final ProfileService profileService;

    @ResponseBody
    @GetMapping("/profile/{nickname}")
    public ProfileDto profile(@PathVariable("nickname") String nickname) {
        ProfileDto profileDto = profileService.searchProfile(nickname);
        System.out.println("profileDto = " + profileDto);
        return profileDto;
    }

//    @ResponseBody
//    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

}
