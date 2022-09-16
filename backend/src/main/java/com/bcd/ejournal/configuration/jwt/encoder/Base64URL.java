package com.bcd.ejournal.configuration.jwt.encoder;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Base64URL {
    private Base64URL() {
    }

    public static String encode(String rawString) {
        return Base64URL.encode(rawString.getBytes(StandardCharsets.UTF_8));
    }

    public static String encode(byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String decode(String base64String) {
        return new String(Base64.getUrlDecoder().decode(base64String));
    }
}
