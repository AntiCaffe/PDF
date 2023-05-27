package project.capstone.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.capstone.controller.dto.DashboardDto;
import project.capstone.controller.dto.NewItemDto;
import project.capstone.controller.dto.ProfileDto;
import project.capstone.repository.ItemRepository;
import project.capstone.service.ItemService;
import project.capstone.service.ProfileService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final ItemRepository itemRepository;
    private final ItemService itemService;
    private final ProfileService profileService;

    @GetMapping("/main-page")
    public String redirect() {
        return "redirect:/";
    }

    @ApiOperation(value = "대시보드 아이템 리스트 컨트롤러",
            response = DashboardDto.class)
    @ResponseBody
    @GetMapping("/items")
    public List<DashboardDto> responseItemList() {
        return itemService.itemList();
    }

    @ApiOperation(value = "아이템 하나 컨트롤러",
            response = DashboardDto.class)
    @ResponseBody
    @GetMapping("/item")
    public DashboardDto responseItem(@RequestParam(value = "name") String name) {
        return itemService.findOneItem(name);
    }

    @ApiOperation(value = "사용자 정보 조회 컨트롤러")
    @ResponseBody
    @GetMapping("/profile/{nickname}")
    public ProfileDto profile(@PathVariable("nickname") String nickname) {
        ProfileDto profileDto = profileService.searchProfile(nickname);
        System.out.println("profileDto = " + profileDto);
        return profileDto;
    }

    @ApiOperation(value = "아이템 저장 컨트롤러 (수정 필요)")
    @ResponseBody
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long saveItem(HttpServletRequest request, @RequestParam(value = "image") MultipartFile image, NewItemDto dto) throws IOException {
        System.out.println("saveItemController");
        System.out.println(image);
        System.out.println(dto);
        return itemService.saveItem(dto, image);
    }


}
