package com.smarttax.dto;

import com.smarttax.entity.User;
import lombok.Getter;

@Getter

public class UserResponseDto {

    private Long id;
    private String userId;
    private String name;;
    private String email;

    public UserResponseDto(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.name =user.getName();
        this.email = user.getEmail();

    }

}
