package com.smarttax.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {

    private String userId;
    private String name;
    private String email;
    private String address;


}
