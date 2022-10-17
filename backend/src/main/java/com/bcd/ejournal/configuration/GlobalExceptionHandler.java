package com.bcd.ejournal.configuration;

import com.bcd.ejournal.domain.exception.ConflictException;
import com.bcd.ejournal.domain.exception.ForbiddenException;
import com.bcd.ejournal.domain.exception.MethodNotAllowedException;
import com.bcd.ejournal.domain.exception.UnauthorizedException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = { NullPointerException.class })
    public ResponseEntity<Object> handleNotFound(NullPointerException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = { DataIntegrityViolationException.class })
    public ResponseEntity<Object> handleConflict(DataIntegrityViolationException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = { ConflictException.class })
    public ResponseEntity<Object> handleConflict(ConflictException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = { UnauthorizedException.class })
    public ResponseEntity<Object> handleUnauthorized(UnauthorizedException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = { ForbiddenException.class })
    public ResponseEntity<Object> handleForbiddenException(ForbiddenException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(value = { MethodNotAllowedException.class })
    public ResponseEntity<Object> handleMethodNotAllowedException(MethodNotAllowedException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler({ MethodArgumentNotValidException.class })
    public ResponseEntity<Map<String, Object>> yourExceptionHandler(MethodArgumentNotValidException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        Map<String, String> messages = new LinkedHashMap<>();

        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            messages.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        body.put("timestamp", LocalDateTime.now());
        body.put("messages", messages);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}
