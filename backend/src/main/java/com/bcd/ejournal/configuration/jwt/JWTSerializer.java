package com.bcd.ejournal.configuration.jwt;


import com.bcd.ejournal.domain.entity.Account;

public interface JWTSerializer {
    String jwtFromAccount(Account account);
}
