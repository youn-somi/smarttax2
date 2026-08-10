package com.smarttax.config;

import com.smarttax.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    // JwtFilter(제이더블유티 필터)
    // 요청에 JWT가 있는지 확인하고 로그인한 사용자인지 검사

    @Bean
    public PasswordEncoder passwordEncoder() {
        // PasswordEncoder(패스워드 인코더)
        // 비밀번호를 암호화하는 도구

        return new BCryptPasswordEncoder();
        // BCrypt 방식으로 비밀번호 암호화
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // CORS 설정
        // React(5173)에서 Spring 서버로 요청할 수 있게 허용

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // 회원가입과 로그인은 로그인하지 않아도 가능
                        .requestMatchers(
                                "/api/users/signup",
                                "/api/users/login",

                                // Swagger 화면
                                "/swagger-ui/**",
                                "/swagger-ui.html",

                                // Swagger API 문서
                                "/v3/api-docs/**"
                        ).permitAll()

                        // 그 외 API는 로그인 필요
                        .anyRequest().authenticated()
                );

        // Spring Security가 인증 여부를 확인하기 전에
        // 우리가 만든 JWT 필터를 먼저 실행
        http.addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}