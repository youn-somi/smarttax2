package com.smarttax.service;

import com.smarttax.entity.Product;
import com.smarttax.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ProductService {
    private final ProductRepository productRepository;
//저장
    public Product saveProduct (Product product) {
        return  productRepository.save(product);
    }
    //조회
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
    //상세조회
    public Product findProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("품목을 찾을 수 없습니다."));
    }
    //수정
    public Product updateProduct(Long id, Product product) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("품목을 찾을 수 없습니다."));

        existingProduct.setProductName(product.getProductName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setUnitPrice(product.getUnitPrice());
        existingProduct.setSupplyAmount(product.getSupplyAmount());
        existingProduct.setTaxAmount(product.getTaxAmount());

        return productRepository.save(existingProduct);
    }
    //삭제
    public void deleteProduct(Long id) {

        productRepository.deleteById(id);

    }

}
