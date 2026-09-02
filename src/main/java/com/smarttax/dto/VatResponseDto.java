package com.smarttax.dto;

import com.smarttax.entity.Vat;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class VatResponseDto {

    // 손님에게 보여줄 부가세 내역 데이터 목록이 들어가는 공간
    private List<VatItemDto> content;

    // 현재 보고 있는 페이지 번호 (예: 1페이지)
    private int currentPage;

    // 한 페이지에 보여줄 데이터 개수 (예: 10개)
    private int pageSize;

    // 전체 부가세 내역의 총 개수 (예: 총 150개)
    private long totalElements;

    // 전체 페이지의 총 수 (예: 총 15페이지)
    private int totalPages;

    // 포장지 만드는 기능
    public static VatResponseDto from(Page<Vat> vatPage) {
        List<VatItemDto> content = vatPage.getContent().stream().map(VatItemDto::from).toList();

        return VatResponseDto.builder()
                .content(content)
                .currentPage(vatPage.getNumber())
                .pageSize(vatPage.getSize())
                .totalElements(vatPage.getTotalElements())
                .totalPages(vatPage.getTotalPages())
                .build();
    }
}