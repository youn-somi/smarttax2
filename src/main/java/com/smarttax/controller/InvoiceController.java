package com.smarttax.controller;

import com.smarttax.entity.Invoice;
import com.smarttax.service.InvoiceService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public Invoice saveInvoice(
            @RequestBody Invoice invoice
    ) {
        return invoiceService.saveInvoice(invoice);
    }
    @GetMapping
    public List<Invoice> findAllInvoices() {
        return invoiceService.findAllInvoices();
    }
    @GetMapping("/{id}")
    public Invoice findInvoiceById(
            @PathVariable Long id

    ){
        return invoiceService.findInvoiceById(id);
    }
    @PutMapping("/{id}")
    public Invoice updateInvoice(
            @PathVariable Long id,
            @RequestBody Invoice invoice
    ) {
        return  invoiceService.updateInvoice(id, invoice);
    }
    @GetMapping("/search")
    public List<Invoice> findBySupplierName (
            @RequestParam String  supplierName
    )
    {
        return invoiceService.findBySupplierName(supplierName);
    }
    @GetMapping("/search/customer")
    public List<Invoice> findByCustomerName(
            @RequestParam String customerName
    ){
        return invoiceService.findByCustomerName(customerName);
    }
    @GetMapping("/search/issue-date")
    public List<Invoice> findByIssueDate(
            @RequestParam LocalDate issueDate
            ){
        return invoiceService.findByIssueDate(issueDate);
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(
            @PathVariable Long id
    ){
        invoiceService.deleteInvoice(id);
    }
    @GetMapping("/search/{status}")
    public List<Invoice> findByStatus(
            @PathVariable String status
    ){
        return invoiceService.findByStatus(status);
    }
    @GetMapping("/search/period")
    public List<Invoice> findByIssueDateBetween(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    )
    {
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
}