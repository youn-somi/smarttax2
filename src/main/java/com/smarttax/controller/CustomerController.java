package com.smarttax.controller;

import com.smarttax.entity.Customer;
import com.smarttax.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
 //저장
    @PostMapping
    public Customer saveCustomer(
            @RequestBody Customer customer
    ) {
        return customerService.saveCustomer(customer);

    }
//조회
    @GetMapping
    public List<Customer> findAllCustomers() {
        return customerService.findAllCustomer();

    }

    @GetMapping("/{id}")
    public Customer findCustomerById(
            @PathVariable Long id
    ) { return  customerService.findCustomerById(id);

    }
    //수정
    @PutMapping("/{id}")
     public Customer updateCustomer(
             @PathVariable Long id,
             @RequestBody Customer customer
    ) {
        return customerService.updateCustomer(id, customer);
    }
    @DeleteMapping("/{id}")
    public void deleteCustomer (
            @PathVariable Long id
    ) {
        customerService.deleteCustomer(id);
    }
}
