package com.smarttax.dto;

import com.smarttax.entity.Vat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VatItemDto {

    private Long id;
    private int year;
    private int quarter;
    private Long amount;
    private Long vatAmount;
    private LocalDateTime createdAt;

    public static VatItemDto from(Vat vat) {
        return VatItemDto.builder()
                .id(vat.getId())
                .year(vat.getYear())
                .quarter(vat.getQuarter())
                .amount(vat.getAmount())
                .vatAmount(vat.getVatAmount())
                .createdAt(vat.getCreatedAt())
                .build();
    }


}
