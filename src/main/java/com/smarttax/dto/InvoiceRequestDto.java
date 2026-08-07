package com.smarttax.dto;

import com.smarttax.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

public class InvoiceRequestDto {
    private String invoiceNumber;

    private LocalDate issueDate;

    private String supplierName;

    private String customerName;

    private Long totalAmount;

    private Long taxAmount;

    private Long supplyAmount;

    private String status;

    private String memo;

    private List<Product> products = new ArrayList<>();
}
