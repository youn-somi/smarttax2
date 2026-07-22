package com.smarttax.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequestDto {

    @NotBlank
    private  String userId;

    @NotBlank
    private String password;
}
