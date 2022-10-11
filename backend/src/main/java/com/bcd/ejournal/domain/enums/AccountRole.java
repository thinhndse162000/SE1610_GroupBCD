package com.bcd.ejournal.domain.enums;

public enum AccountRole {
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
}
