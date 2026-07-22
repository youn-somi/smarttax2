package com.smarttax.service;

import com.smarttax.dto.UserLoginRequestDto;
import com.smarttax.dto.UserSignupRequestDto;
import com.smarttax.entity.User;
import com.smarttax.jwt.JwtProvider;
import com.smarttax.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public void signup(UserSignupRequestDto dto) {

        //아이디 중복확인
        if(userRepository.existsByUserId(dto.getUserId())) {
            throw new RuntimeException("이미 존재하는 아이디 입니다.");
        }

        //회원 생성
        User user = new User();

        user.setUserId(dto.getUserId());
        user.setPassword(
                passwordEncoder.encode(dto.getPassword()));
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        //DB 저장
        userRepository.save(user);
    }

    //========로그인 추가 ================
    public String login(UserLoginRequestDto dto) {

        //아이디로 회원찾기
        Optional<User> userOptional =
                userRepository.findByUserId(dto.getUserId());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("아이디가 존재하지 않습니다.");
        }

        //봉투 에서 user 꺼내기
        User user = userOptional.get();

        //비밀번호 확인
        if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치 하지 않습니다.");
        }
        //로그인 성공
        System.out.println("로그인 성공");

        //출입증 발급
        return  jwtProvider.createToken(user.getUserId());


    }
}