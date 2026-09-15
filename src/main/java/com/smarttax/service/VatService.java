package com.smarttax.service;

import com.smarttax.dto.VatResponseDto;
import com.smarttax.entity.Vat;
import com.smarttax.repository.VatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VatService {

    private final VatRepository vatRepository;

    public VatResponseDto getVatList(Integer year, Integer quarter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        // null 값이 들어와도 에러 안 나고 처리되는 동적 쿼리 메서드 호출
        Page<Vat> vatPage = vatRepository.findByYearAndQuarterDynamic(year, quarter, pageable);

        return VatResponseDto.from(vatPage);
    }
}