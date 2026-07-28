package com.smarttax.repository;


import com.smarttax.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository
        extends JpaRepository<Invoice, Long> {

}





