package com.smarttax.controller;

import com.smarttax.dto.UserLoginRequestDto;
import com.smarttax.dto.UserSignupRequestDto;
import com.smarttax.jwt.JwtProvider;
import com.smarttax.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private  final UserService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public String signup(
            @RequestBody UserSignupRequestDto dto
            ) {
        userService.signup(dto);

        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(
            @RequestBody UserLoginRequestDto dto
    ) {
       return userService.login(dto);

    }
    @GetMapping("/me")
    public String me (

            @RequestHeader ("Authorization") String authorization
    ) {
        String token = authorization.substring(7);
        String userId= jwtProvider.getUserId(token);

        return userId + "님 로그인 상태입니다. ";
    }
}
