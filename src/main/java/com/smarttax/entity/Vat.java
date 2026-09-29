package com.smarttax.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.smarttax.entity.Invoice;

@Entity
@Getter
@NoArgsConstructor

public class Vat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int year;
    private int quarter;
    private Long amount;
    private Long vatAmount;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    public Vat (
            int year,
            int quarter,
            Long amount,
            Long vatAmount,
            LocalDateTime createdAt
    ) {
        this.year=year;
        this.quarter=quarter;
        this.amount=amount;
        this.vatAmount=vatAmount;
        this.createdAt=createdAt;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice=invoice;
    }




}
