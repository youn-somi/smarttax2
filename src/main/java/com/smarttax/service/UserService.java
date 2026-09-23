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
        user.setAddress(dto.getAddress());

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
    public boolean checkUserId(String userId) {
        return  userRepository.existsByUserId(userId);
    }

    public  User findUserByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(()->
                        new RuntimeException("사용자를 찾을 수 없습니다."));

    }

    public String  findUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->
                                new RuntimeException("해당 이메일로 가입된 회원이 없습니다.") );
                return maskUuerId(user.getUserId());
    }
    private String maskUuerId(String userId) {
        int keepLength = Math.min(2, userId.length() -1);
        String masked = userId.substring(0, keepLength);
        masked = masked + "*".repeat(Math.max(3, userId.length() - keepLength));
        return  masked;

    }
    public String resetPassword(String userId, String email){
        User user = userRepository.findByUserIdAndEmail(userId, email)
                .orElseThrow(()-> new RuntimeException("아이디 또는 이메일이 일치하지 않습니다."));
        String tempPassword = "tmp" + (int)(Math.random() * 90000 + 10000);
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);
        return  tempPassword;

    }
}