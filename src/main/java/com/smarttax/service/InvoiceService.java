package com.smarttax.service;

import com.smarttax.entity.Invoice;
import com.smarttax.entity.InvoiceItem;
import com.smarttax.repository.InvoiceItemRepository;
import com.smarttax.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
 //품목과 세금계산서를 연결한 뒤, DB에 저장하고 저장된 결과를 돌려주는 기능
    public Invoice saveInvoice(Invoice invoice) {

        for (InvoiceItem item : invoice.getItems()) {
            item.setInvoice(invoice);
        }

        return invoiceRepository.save(invoice);
    }
    public List <Invoice> findAllInvoices() {
        return  invoiceRepository.findAll();
    }
    public  Invoice findInvoiceById(Long id) {
        return  invoiceRepository.findById(id)
                .orElseThrow(() ->new RuntimeException(" 세금계산서를 찾을 수 없습니다."));

    }
}