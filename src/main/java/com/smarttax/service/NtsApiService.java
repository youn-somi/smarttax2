package com.smarttax.service;


import com.smarttax.dto.NtsBusinessResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NtsApiService {
    @Value("${nts.api-key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();
    public NtsBusinessResponseDto checkBusinessNumber(String businessNumber) {
        String url = "https://api.odcloud.kr/api/nts-businessman/v1/status"
                + "?serviceKey=" + apiKey
                + "&returnJson=Y";

        NtsBusinessResponseDto response = restClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("b_no", List.of(businessNumber)))
                .retrieve()
                .body(NtsBusinessResponseDto.class);
        return response;
    }
}
