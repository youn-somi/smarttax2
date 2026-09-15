package com.smarttax.controller;

import com.smarttax.dto.VatResponseDto;
import com.smarttax.service.VatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vats")
@RequiredArgsConstructor

public class VatController {

    private final VatService vatService;
    @GetMapping
    public ResponseEntity<VatResponseDto> getVatList(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer quarter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        VatResponseDto response = vatService.getVatList(year, quarter, page, size);
        return  ResponseEntity.ok(response);


    }
}
