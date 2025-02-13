package com.nw.hackathon.repository;

import com.nw.hackathon.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    // Using method query derivation
    Policy findByPolNumber(String polNumber);
}
