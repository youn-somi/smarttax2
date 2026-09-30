package com.smarttax.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class NtsBusinessResponseDto {

    @JsonProperty("status_code")
    private String statusCode;
    private List<NtsItem> data;

    @Getter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NtsItem {
        private String b_no;
        private String b_nm;
        private String p_nm;
        private String b_acr;
        private String tax_type;


    }
}
