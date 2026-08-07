package com.smarttax.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = " customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String ceoName;

    private String businessNumber;

    private String phone;

    private String address;
}
