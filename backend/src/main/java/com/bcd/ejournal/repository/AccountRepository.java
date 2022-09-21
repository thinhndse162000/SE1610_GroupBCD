package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.entity.Account;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);

    Optional<Account> findByEmailAndStatusTrue(String email);
}
