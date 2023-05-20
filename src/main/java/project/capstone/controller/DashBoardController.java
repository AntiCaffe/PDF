package project.capstone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.controller.dto.NewItemDto;
import project.capstone.controller.dto.ProfileDto;
import project.capstone.service.ItemService;
import project.capstone.service.ProfileService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final ItemService itemService;
    private final ProfileService profileService;

    @ResponseBody
    @GetMapping("/profile/{nickname}")
    public ProfileDto profile(@PathVariable("nickname") String nickname) {
        ProfileDto profileDto = profileService.searchProfile(nickname);
        System.out.println("profileDto = " + profileDto);
        return profileDto;
    }

    @ResponseBody
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long saveItem(HttpServletRequest request, @RequestParam(value = "image") MultipartFile image, NewItemDto dto) throws IOException {
        System.out.println("saveItemController");
        System.out.println(image);
        System.out.println(dto);
        return itemService.saveItem(dto, image);
    }


}
