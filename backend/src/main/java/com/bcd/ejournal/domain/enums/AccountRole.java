package com.bcd.ejournal.domain.enums;

public enum AccountRole {
<<<<<<< HEAD
    MEMBER("MB"),
    ADMIN("AD"),
    MANAGER("MA"),
    MB("MB");

    private final String text;

    AccountRole(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
=======
    MEMBER,
    ADMIN,
    MANAGER
>>>>>>> fa7bc9628dcf3d0fa2ef64cf90a8ecb9602c3fb0
}
