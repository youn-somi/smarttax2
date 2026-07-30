package com.smarttax.controller;

import com.smarttax.entity.Invoice;
import com.smarttax.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{id}")
    public void deleteInvoice(
            @PathVariable Long id
    ){
        invoiceService.deleteInvoice(id);
    }
}