package com.bcd.ejournal.configuration.jwt;

import static java.time.Instant.now;

import java.util.regex.Pattern;

import com.bcd.ejournal.configuration.jwt.encoder.Base64URL;
import com.bcd.ejournal.configuration.jwt.encoder.HmacSHA256;
import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.configuration.jwt.payload.JWTPayload;
import com.bcd.ejournal.domain.entity.Account;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTService implements JWTSerializer, JWTDeserializer {
    private static final String JWT_HEADER = Base64URL.encode("{\"alg\":\"HS256\",\"type\":\"JWT\"}");
    private static final String BASE64URL_PATTERN = "[\\w_\\-]+";
    private static final Pattern JWT_PATTERN = Pattern.compile(String.format("^(%s\\.)(%s\\.)(%s)$",
            BASE64URL_PATTERN, BASE64URL_PATTERN, BASE64URL_PATTERN));

    private final byte[] secret;
    private final long duration;
    private final ObjectMapper objectMapper;

    public JWTService(byte[] secret, long duration, ObjectMapper objectMapper) {
        this.secret = secret;
        this.duration = duration;
        this.objectMapper = objectMapper;
    }

    @Override
    public String jwtFromAccount(Account account) {
        AccountJWTPayload payload = AccountJWTPayload.of(account, now().getEpochSecond() + duration);
        String payloadBase64 = Base64URL.encode(payload.toString());

        final String message = JWT_HEADER.concat(".").concat(payloadBase64);

        final String signature = Base64URL.encode(HmacSHA256.sign(secret, message));
        return message.concat(".").concat(signature);
    }
    
    public String jwtShrotDuration(Account account) {
        AccountJWTPayload payload = AccountJWTPayload.of(account, now().getEpochSecond() + 300);
        String payloadBase64 = Base64URL.encode(payload.toString());

        final String message = JWT_HEADER.concat(".").concat(payloadBase64);

        final String signature = Base64URL.encode(HmacSHA256.sign(secret, message));
        return message.concat(".").concat(signature);
    }
    
    @Override
    public JWTPayload jwtPayloadFromJWT(String jwtToken) {
        // Check structure
        if (!JWT_PATTERN.matcher(jwtToken).matches()) {
            throw new IllegalArgumentException("Malformed JWT: " + jwtToken);
        }

        // Check header
        final var splintedTokens = jwtToken.split("\\.");
        if (!splintedTokens[0].equals(JWT_HEADER)) {
            throw new IllegalArgumentException("Malformed JWT! Token must starts with header: " + JWT_HEADER);
        }

        // Check signature
        final var signatureBytes = HmacSHA256.sign(secret, splintedTokens[0].concat(".").concat(splintedTokens[1]));
        if (!Base64URL.encode(signatureBytes).equals(splintedTokens[2])) {
            throw new IllegalArgumentException("Token has invalid signature: " + jwtToken);
        }

        try {
            final String decodedPayload = Base64URL.decode(splintedTokens[1]);
            final JWTPayload jwtPayload = objectMapper.readValue(decodedPayload, AccountJWTPayload.class);
            // Check expired
            if (jwtPayload.isExpired()) {
                throw new IllegalArgumentException("Token expired");
            }
            return jwtPayload;
        } catch (Exception exception) {
            throw new IllegalArgumentException(exception);
        }
    }
}
