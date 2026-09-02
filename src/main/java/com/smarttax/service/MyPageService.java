package com.smarttax.service;

import com.smarttax.dto.MyPageResponseDto;
import com.smarttax.dto.MyPageUpdateRequestDto;
import com.smarttax.entity.User;
import com.smarttax.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    public MyPageResponseDto getMyPage(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다. "));
        return new MyPageResponseDto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getAddress()
        );
    }

    public void updateMyPage (String userId, MyPageUpdateRequestDto dto) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()-> new RuntimeException("사용자를 찾을 수 없습니다."));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());

        userRepository.save(user);
    }
    public void deletMyPage(String userId) {

        User user= userRepository.findByUserId(userId)
                .orElseThrow(()-> new RuntimeException("사용자를 찾을 수 없습니다."));

        userRepository.delete(user);
    }

}
