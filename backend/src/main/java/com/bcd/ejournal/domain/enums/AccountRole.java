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
>>>>>>> 3fadac01e5e1ab735657b1f75a080e621491e8fe
}
