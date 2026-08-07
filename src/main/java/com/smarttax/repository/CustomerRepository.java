package com.smarttax.repository;

import com.smarttax.entity.Customer;
import org.apache.catalina.LifecycleState;
import org.hibernate.validator.constraints.ScriptAssert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByCompanyName(String companyName);
    List<Customer> findByPhone(String phone);
    List<Customer> findByCeoName(String ceoName);
    List<Customer> findByAddress(String address);
}
