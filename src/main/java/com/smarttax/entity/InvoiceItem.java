package com.smarttax.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invoice_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private Integer quantity;

    private Long unitPrice;

    private Long supplyAmount;

    private Long taxAmount;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}