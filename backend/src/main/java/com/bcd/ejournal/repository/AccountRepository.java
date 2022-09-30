package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);

    @Query("SELECT a FROM Account a WHERE a.email LIKE :email AND a.status LIKE 'OPEN'")
    Optional<Account> findByEmailAndStatusEqualsOpen(String email);
}
