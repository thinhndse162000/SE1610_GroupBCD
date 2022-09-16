package com.bcd.ejournal.configuration.jwt;


import com.bcd.ejournal.configuration.jwt.payload.JWTPayload;

public interface JWTDeserializer {

    JWTPayload jwtPayloadFromJWT(String jwtToken);
}
