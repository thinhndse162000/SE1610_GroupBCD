package com.bcd.ejournal.domain.exception;

public class MethodNotAllowedException extends RuntimeException{

    public MethodNotAllowedException(String message) {
        super(message);
    }
}
