package com.smarttax.repository;


import com.smarttax.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository
        extends JpaRepository<Invoice, Long> {
    List<Invoice> findBysupplierName(String supplierName);
    List<Invoice> findByCustomerName(String customerName);

}





