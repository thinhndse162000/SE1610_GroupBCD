package com.bcd.ejournal.repository;

import java.util.Optional;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import com.bcd.ejournal.domain.entity.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);

    Optional<Account> findBySlug(String slug);

    @Query("SELECT a FROM Account a WHERE a.email LIKE :email AND a.status = 'OPEN'")
    Optional<Account> findByEmailAndStatusEqualsOpen(String email);
    
    @Transactional
    @Modifying
    @Query("UPDATE Account a SET a.enable = '1' WHERE a.accountId = :#{#acc.accountId} ")
    void updateEnable(@Param("accountId") Account acc);
}
