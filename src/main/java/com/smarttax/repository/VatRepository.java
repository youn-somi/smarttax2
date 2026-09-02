package com.smarttax.repository;

import com.smarttax.entity.Vat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VatRepository extends JpaRepository<Vat, Long> {
    Page<Vat> findByYearAndQuarter(int year, int quarter, Pageable pageable);
}
