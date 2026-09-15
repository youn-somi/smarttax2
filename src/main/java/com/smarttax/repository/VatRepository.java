package com.smarttax.repository;

import com.smarttax.entity.Vat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VatRepository extends JpaRepository<Vat, Long> {

    // year나 quarter가 null이면 조건식을 무시하고 전체 조회하도록 처리한 동적 쿼리
    @Query("SELECT v FROM Vat v WHERE (:year IS NULL OR v.year = :year) AND (:quarter IS NULL OR v.quarter = :quarter)")
    Page<Vat> findByYearAndQuarterDynamic(
            @Param("year") Integer year,
            @Param("quarter") Integer quarter,
            Pageable pageable
    );
}