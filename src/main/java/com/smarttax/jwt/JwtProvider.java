package com.smarttax.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {

    private final SecretKey secretkey =
            Jwts.SIG.HS256.key().build();

    //출입증(JWT) 만들기
    public String createToken(String userId) {

        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(secretkey)
                .compact();
    }
//출입증이 진짜인지 검사하는 경비원
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretkey)
                    .build()
                    .parseSignedClaims(token);
            return true;

        } catch (Exception e) {
            System.out.println("JWT 검사 실패 이유 = " + e.getMessage());
            return false;
        }

    }
 //JWT에서 아이디만 꺼내오는 함수
    public String getUserId(String token) {
        return Jwts.parser()
                .verifyWith(secretkey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}