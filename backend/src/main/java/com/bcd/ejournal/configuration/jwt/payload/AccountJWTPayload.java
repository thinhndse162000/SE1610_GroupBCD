package com.bcd.ejournal.configuration.jwt.payload;


import com.bcd.ejournal.domain.entity.Account;

import static java.time.Instant.now;

public class AccountJWTPayload implements JWTPayload {
    private final Integer sub;
    private final String name;
    private final long iat;

    AccountJWTPayload(Integer sub, String name, long iat) {
        this.sub = sub;
        this.name = name;
        this.iat = iat;
    }

    public static AccountJWTPayload of(Account account, long epochSecondExpired) {
        return new AccountJWTPayload(account.getAccountId(), account.getEmail(), epochSecondExpired);
    }

    @Override
    public Integer getAccountId() {
        return sub;
    }

    @Override
    public boolean isExpired() {
        return iat < now().getEpochSecond();
    }

    @Override
    public String toString() {
        return String.format("{\"sub\":%d,\"name\":\"%s\",\"iat\":%d}", sub, name, iat);
    }
}
