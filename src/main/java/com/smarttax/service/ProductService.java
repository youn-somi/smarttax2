package com.smarttax.service;

import com.smarttax.entity.Invoice;
import com.smarttax.entity.Product;
import com.smarttax.repository.InvoiceRepository;
import com.smarttax.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InvoiceRepository invoiceRepository;

    public Product saveProduct(Long invoiceId, Product product) {

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("세금계산서를 찾을 수 없습니다."));

        product.setInvoice(invoice);

        return productRepository.save(product);
    }

    public List<Product> findAllProducts() {

        return productRepository.findAll();
    }

    public Product findProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("품목을 찾을 수 없습니다."));
    }

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

    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }
}