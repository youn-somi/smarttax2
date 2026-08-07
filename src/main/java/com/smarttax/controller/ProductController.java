package com.smarttax.controller;

import com.smarttax.entity.Product;
import com.smarttax.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public Product saveProduct(@RequestBody Product product) {

        return productService.saveProduct(product);

    }

    @GetMapping
    public List<Product> findAllProducts() {

        return productService.findAllProducts();

    }

    @GetMapping("/{id}")
    public Product findProductById(@PathVariable Long id) {

        return productService.findProductById(id);

    }

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        return productService.updateProduct(id, product);

    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);

    }
}