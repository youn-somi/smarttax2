package com.smarttax.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {

    private Long userId;
    private String userName;
    private String email;
}
