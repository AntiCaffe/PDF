package project.capstone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/authentication/sing-in")
    public String test() {
        return "Hello, world!";
    }
}