package com.smarttax.controller;

import com.smarttax.dto.MyPageResponseDto;
import com.smarttax.dto.MyPageUpdateRequestDto;
import com.smarttax.jwt.JwtProvider;
import com.smarttax.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    private final JwtProvider jwtProvider;

    @GetMapping
    public MyPageResponseDto getMyPage(
            @RequestHeader("Authorization") String authorization
    )
    {
        String token = authorization.substring(7);
        String userId = jwtProvider.getUserId(token);

        return myPageService.getMyPage(userId);
    }

    @PutMapping
    public void updateMyPage(
            @RequestHeader("Authorization") String authorization,
            @RequestBody MyPageUpdateRequestDto dto

            ) {
        String token = authorization.substring(7);
        String userId = jwtProvider.getUserId(token);

        myPageService.updateMyPage(userId, dto);
    }
    @DeleteMapping
    public void deletMyPage(
            @RequestHeader("Authorization") String authorization

    ) {
        String token = authorization.substring(7);
        String userId = jwtProvider.getUserId(token);

        myPageService.deletMyPage(userId);
    }

}
