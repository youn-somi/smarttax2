package com.smarttax.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserSignupRequestDto {
    private  String userId;

    private  String  password;

    private  String name;

    private  String email;
}
