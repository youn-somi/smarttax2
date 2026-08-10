package com.smarttax.service;

import com.smarttax.entity.Product;
import com.smarttax.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
// Service(서비스) = 실제 업무 처리를 담당하는 곳
// Controller가 받은 일을 Repository에게 전달해주는 중간 관리자

@RequiredArgsConstructor
// RequiredArgsConstructor(리콰이어드 아그스 컨스트럭터)
// final이 붙은 필드를 자동으로 생성자 주입해 줌

public class ProductService {

    private final ProductRepository productRepository;
    // ProductRepository(프로덕트 레포지토리)
    // 품목 데이터를 DB에 저장/조회/수정/삭제하는 창고 역할


    // =========================
    // 저장
    // =========================

    public Product saveProduct(Product product) {
        // saveProduct(세이브 프로덕트)
        // 품목 하나를 저장하는 메서드

        return productRepository.save(product);
        // Repository에게 Product 저장을 시킴
        // 저장된 Product를 다시 돌려줌
    }


    // =========================
    // 전체 조회
    // =========================

    public List<Product> findAllProducts() {
        // findAllProducts(파인드 올 프로덕츠)
        // 모든 품목을 조회하는 메서드
        // List<Product> = Product 여러 개

        return productRepository.findAll();
        // DB에 있는 모든 Product를 가져옴
    }


    // =========================
    // 상세 조회
    // =========================

    public Product findProductById(Long id) {
        // findProductById(파인드 프로덕트 바이 아이디)
        // id로 품목 하나를 조회

        return productRepository.findById(id)
                // DB에서 해당 id의 Product를 찾음

                .orElseThrow(() -> new RuntimeException("품목을 찾을 수 없습니다."));
        // 찾았으면 Product 반환
        // 못 찾았으면 "품목을 찾을 수 없습니다." 오류 발생
    }


    // =========================
    // 수정
    // =========================

    public Product updateProduct(Long id, Product product) {
        // updateProduct(업데이트 프로덕트)
        // 기존 품목을 수정하는 메서드

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("품목을 찾을 수 없습니다."));
        // 먼저 수정할 기존 품목을 DB에서 찾음


        existingProduct.setProductName(product.getProductName());
        // 품목명을 새 값으로 변경

        existingProduct.setQuantity(product.getQuantity());
        // 수량 변경

        existingProduct.setUnitPrice(product.getUnitPrice());
        // 단가 변경

        existingProduct.setSupplyAmount(product.getSupplyAmount());
        // 공급가액 변경

        existingProduct.setTaxAmount(product.getTaxAmount());
        // 세액 변경


        return productRepository.save(existingProduct);
        // 수정된 Product를 DB에 저장
        // 저장된 결과를 반환
    }


    // =========================
    // 삭제
    // =========================

    public void deleteProduct(Long id) {
        // deleteProduct(딜리트 프로덕트)
        // id에 해당하는 품목을 삭제

        productRepository.deleteById(id);
        // Repository에게 해당 id의 Product 삭제 요청
    }
}