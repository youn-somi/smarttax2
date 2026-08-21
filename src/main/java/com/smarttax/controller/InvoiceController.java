package com.smarttax.controller;

import com.smarttax.dto.InvoiceRequestDto;
import com.smarttax.entity.Invoice;
import com.smarttax.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<?> saveInvoice(@RequestBody InvoiceRequestDto dto) {

        try {
            return ResponseEntity.ok(invoiceService.saveInvoice(dto));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body("이미 등록된 세금계산서 번호입니다.");
        }
    }

    @GetMapping
    public List<Invoice> findAllInvoices() {
        return invoiceService.findAllInvoices();
    }

    @GetMapping("/{id}")
    public Invoice findInvoiceById(
            @PathVariable Long id
    ) {
        return invoiceService.findInvoiceById(id);
    }

    @PutMapping("/{id}")
    public Invoice updateInvoice(
            @PathVariable Long id,
            @RequestBody Invoice invoice
    ) {
        return invoiceService.updateInvoice(id, invoice);
    }

    @GetMapping("/search")
    public List<Invoice> findBySupplierName(
            @RequestParam String supplierName
    ) {
        return invoiceService.findBySupplierName(supplierName);
    }

    @GetMapping("/search/customer")
    public List<Invoice> findByCustomerName(
            @RequestParam String customerName
    ) {
        return invoiceService.findByCustomerName(customerName);
    }

    @GetMapping("/search/issue-date")
    public List<Invoice> findByIssueDate(
            @RequestParam LocalDate issueDate
    ) {
        return invoiceService.findByIssueDate(issueDate);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(
            @PathVariable Long id
    ) {
        invoiceService.deleteInvoice(id);
    }

    @GetMapping("/search/{status}")
    public List<Invoice> findByStatus(
            @PathVariable String status
    ) {
        return invoiceService.findByStatus(status);
    }

    @GetMapping("/search/period")
    public List<Invoice> findByIssueDateBetween(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        return invoiceService.findByIssueDateBetween(
                startDate,
                endDate
        );
    }

    @GetMapping("/search/amount")
    public List<Invoice> findByTotalAmountBetween(
            @RequestParam Integer minAmount,
            @RequestParam Integer maxAmount
    ) {
        return invoiceService.findByTotalAmountBetween(
                minAmount,
                maxAmount
        );
    }
    @GetMapping("/quarter")
    public Long getQuarterAmount(
            @RequestParam int year,
            @RequestParam int quarter
    ){
        return invoiceService.getQuarterAmount(year, quarter);
    }
}