package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.entity.Field;
import com.bcd.ejournal.service.UtilService;

@RestController
public class UtilApi {
    private final UtilService utilService;

    @Autowired
    public UtilApi(UtilService utilService) {
        this.utilService = utilService;
    }

    @GetMapping("/field")
    public ResponseEntity<List<Field>> getFields() {
        return new ResponseEntity<>(utilService.getFields(), HttpStatus.OK);
    }
}
