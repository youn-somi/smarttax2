package com.smarttax.repository;

import com.smarttax.entity.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserId(String  userId);
    Optional<User> findByUserId(String userId);


}
