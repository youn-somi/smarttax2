package com.smarttax.service;

import com.smarttax.dto.MyPageResponseDto;
import com.smarttax.dto.MyPageUpdateRequestDto;
import com.smarttax.entity.User;
import com.smarttax.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MyPageResponseDto getMyPage(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        return new MyPageResponseDto(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getAddress()
        );
    }

    public void updateMyPage(String userId, MyPageUpdateRequestDto dto) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 1. 이름 수정
        if (dto.getName() != null && !dto.getName().isEmpty()) {
            user.setName(dto.getName());
        }

        // 2. 이메일 수정
        if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            user.setEmail(dto.getEmail());
        }

        // 3. 주소 수정
        if (dto.getAddress() != null) {
            user.setAddress(dto.getAddress());
        }

        // 4. 비밀번호 수정 (비밀번호를 입력했을 때만 암호화하여 저장)
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(dto.getPassword());
            user.setPassword(encodedPassword);
        }

        userRepository.save(user);
    }

    public void deletMyPage(String userId) {

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        userRepository.delete(user);
    }

}