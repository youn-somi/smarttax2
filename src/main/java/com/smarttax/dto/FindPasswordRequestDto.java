package com.smarttax.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor

public class FindPasswordRequestDto {
    private String usesId;
    private String email;

}
