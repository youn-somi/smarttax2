package com.smarttax.service;

import com.smarttax.dto.InvoiceRequestDto;
import com.smarttax.entity.Invoice;
import com.smarttax.entity.Product;
import com.smarttax.repository.InvoiceRepository;
import com.smarttax.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;


    // 세금계산서 + 품목 저장
    @Transactional
    public Invoice saveInvoice(InvoiceRequestDto dto) {

        Invoice invoice = new Invoice();
        if (invoiceRepository.existsByInvoiceNumber(dto.getInvoiceNumber())) {
            throw new RuntimeException("이미 등록된 세금계산서 번호입니다.");
        }

        invoice.setInvoiceNumber(dto.getInvoiceNumber());
        invoice.setIssueDate(dto.getIssueDate());
        invoice.setSupplierName(dto.getSupplierName());
        invoice.setCustomerName(dto.getCustomerName());
        invoice.setTotalAmount(dto.getTotalAmount());
        invoice.setTaxAmount(dto.getTaxAmount());
        invoice.setSupplyAmount(dto.getSupplyAmount());
        invoice.setStatus(dto.getStatus());
        invoice.setMemo(dto.getMemo());

        for (Product product : dto.getProducts()) {
            product.setInvoice(invoice);
        }

        invoice.setProducts(dto.getProducts());

        return invoiceRepository.save(invoice);
    }


    // 전체 세금계산서 조회
    public List<Invoice> findAllInvoices() {
        return invoiceRepository.findAll();
    }


    // 세금계산서 상세 조회
    public Invoice findInvoiceById(Long id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("세금계산서를 찾을 수 없습니다."));
    }


    // 세금계산서 + 품목 수정
    @Transactional
    public Invoice updateInvoice(Long id, Invoice invoice) {

        Invoice findInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("세금계산서를 찾을 수 없습니다."));

        // 세금계산서 정보 수정
        findInvoice.setInvoiceNumber(invoice.getInvoiceNumber());
        findInvoice.setIssueDate(invoice.getIssueDate());
        findInvoice.setSupplierName(invoice.getSupplierName());
        findInvoice.setCustomerName(invoice.getCustomerName());
        findInvoice.setTotalAmount(invoice.getTotalAmount());
        findInvoice.setTaxAmount(invoice.getTaxAmount());
        findInvoice.setSupplyAmount(invoice.getSupplyAmount());
        findInvoice.setStatus(invoice.getStatus());
        findInvoice.setMemo(invoice.getMemo());

        // 품목 수정
        if (invoice.getProducts() != null) {

            for (Product product : invoice.getProducts()) {
                product.setInvoice(findInvoice);
            }

            findInvoice.setProducts(invoice.getProducts());
        }

        // Dirty Checking(더티 체킹) 실험
        return findInvoice;
    }


    // 세금계산서 삭제
    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }


    // 공급자명 검색
    public List<Invoice> findBySupplierName(String supplierName) {
        return invoiceRepository.findBysupplierName(supplierName);
    }


    // 구매자명 검색
    public List<Invoice> findByCustomerName(String customerName) {
        return invoiceRepository.findByCustomerName(customerName);
    }


    // 발행일 검색
    public List<Invoice> findByIssueDate(LocalDate issueDate) {
        return invoiceRepository.findByIssueDate(issueDate);
    }


    // 상태 검색
    public List<Invoice> findByStatus(String status) {
        return invoiceRepository.findBystatus(status);
    }


    // 기간 검색
    public List<Invoice> findByIssueDateBetween(
            LocalDate startDate,
            LocalDate endDate
    ) {
        return invoiceRepository.findByIssueDateBetween(startDate, endDate);
    }


    // 금액 범위 검색
    public List<Invoice> findByTotalAmountBetween(
            Integer minAmount,
            Integer maxAmount
    ) {
        return invoiceRepository.findByTotalAmountBetween(
                minAmount,
                maxAmount
        );
    }
    public Long getQuarterAmount(int year, int quarter) {

        LocalDate startDate;
        LocalDate endDate;

        if (quarter == 1) {
            startDate = LocalDate.of(year, 1, 1);
            endDate = LocalDate.of(year, 3, 31);

        } else if (quarter == 2) {
            startDate = LocalDate.of(year, 4, 1);
            endDate = LocalDate.of(year, 6, 30);

        } else if (quarter == 3) {
            startDate = LocalDate.of(year, 7, 1);
            endDate = LocalDate.of(year, 9, 30);

        } else {
            startDate = LocalDate.of(year, 10, 1);
            endDate = LocalDate.of(year, 12, 31);
        }

        List<Invoice> invoiceList =
                invoiceRepository.findByIssueDateBetween(
                        startDate,
                        endDate
                );

        return invoiceList.stream()
                .mapToLong(Invoice::getTotalAmount)
                .sum();
    }
}