package com.smarttax.repository;
import com.smarttax.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface InvoiceRepository
        extends JpaRepository<Invoice, Long> {

    // [페이징 지원 조회]
     Page<Invoice> findAll(Pageable pageable);

    List<Invoice> findBysupplierName(String supplierName);

    List<Invoice> findByCustomerName(String customerName);

    List<Invoice> findByIssueDate(LocalDate issueDate);

    List<Invoice> findBystatus(String status);

    List<Invoice> findByIssueDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Invoice> findByTotalAmountBetween(
            Integer minAmount,
            Integer maxAmount
    );

    boolean existsByInvoiceNumber(String invoiceNumber);
}