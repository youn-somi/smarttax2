package com.smarttax.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//"이 클래스는 API 주소를 관리하는 컨트롤러입니다."
@RestController


public class HomeController {
    //이 주소로 들어오면 아래 함수를 실행해
    @GetMapping("/")
    public String  home() {
        return  "홈";
    }
}
