package com.smarttax.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(nullable = false,unique = true)
    private  String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

<<<<<<< HEAD
    @Column
    private String address;
=======
    private String address;

>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e
}
