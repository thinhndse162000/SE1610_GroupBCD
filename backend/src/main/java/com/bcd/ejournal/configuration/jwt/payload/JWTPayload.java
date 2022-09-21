package com.bcd.ejournal.configuration.jwt.payload;

import java.io.Serializable;

public interface JWTPayload extends Serializable {
    Integer getAccountID();

    boolean isExpired();
}
