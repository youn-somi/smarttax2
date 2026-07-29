package com.smarttax.controller;

import com.smarttax.entity.Invoice;
import com.smarttax.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}