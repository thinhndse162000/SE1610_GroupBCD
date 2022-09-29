package com.bcd.ejournal.domain.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class PaperException extends Throwable {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private HttpStatus status;
    private String message;
    private String errorCode;

    public PaperException(String s) {
//		super(s);
    }

    public PaperException(HttpStatus status, String message, String errorCode) {
        super();
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
    }

}
