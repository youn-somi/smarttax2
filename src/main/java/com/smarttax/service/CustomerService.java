package com.smarttax.service;

import com.smarttax.dto.NtsBusinessResponseDto;
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
    private final NtsApiService ntsApiService;

    //고객 사업자번호 중복확인
    public boolean checkBusinessNumber(String businessNumber) {
        if (customerRepository.existsByBusinessNumber(businessNumber)) {
            return true;
        }
        NtsBusinessResponseDto ntsResponse = ntsApiService.checkBusinessNumber(businessNumber);
        String taxType = ntsResponse.getData().get(0).getTax_type();

        if (taxType.contains("등록되지 않은")){
            throw new IllegalArgumentException("국세청에 등록되지 않은 사업자등록번호입니다."
            );
    }
    return false;
}

    public Customer saveCustomer (Customer customer) {
        if (customer.getBusinessNumber() == null || customer.getBusinessNumber().isBlank()) {
            throw new IllegalArgumentException("사업자등록번호는 필수입니다.");
        }
        NtsBusinessResponseDto ntsResponse = ntsApiService.checkBusinessNumber(customer.getBusinessNumber());
        String taxType = ntsResponse.getData().get(0).getTax_type();
        if (taxType.contains("등록되지 않은")) {
            throw new IllegalArgumentException("국세청에 등록되지 않은 사업자등록번호 입니다. 확인 후 다시 시도해주세요.");
        }
    return customerRepository.save(customer);
    }




    //고객명 검색
    public List<Customer> findByCompanyName(String companyName) {
        return customerRepository.findByCompanyName(companyName);
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

        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setManagerName(customer.getManagerName());

        return customerRepository.save(existingCustomer);


    }
    //삭제
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

}
