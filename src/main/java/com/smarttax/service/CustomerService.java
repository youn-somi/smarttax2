package com.smarttax.service;

import com.smarttax.entity.Customer;
import com.smarttax.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
@RequiredArgsConstructor

public class CustomerService {
    private final CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer) {
        return  customerRepository.save(customer);

    }
    //조회
   public  Page<Customer> findAllCustomer(Pageable pageable) {
        return customerRepository.findAll(pageable);
   }
    //없음
    public  Customer findCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("거래처를 찾을 수 없습니다."));
    }
    //수정
    public Customer updateCustomer(
            Long id,
            Customer customer
    ) {Customer existingCustomer = findCustomerById(id);
        existingCustomer.setCompanyName(customer.getCompanyName());
        existingCustomer.setCeoName(customer.getCeoName());

        existingCustomer.setBusinessNumber(customer.getBusinessNumber());

        existingCustomer.setPhone(customer.getPhone());

        existingCustomer.setAddress(customer.getAddress());

        return customerRepository.save(existingCustomer);

    }
    //삭제
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

}
