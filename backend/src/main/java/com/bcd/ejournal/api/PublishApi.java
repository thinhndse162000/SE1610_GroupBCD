package com.bcd.ejournal.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.PublishSearchFilterRequest;
import com.bcd.ejournal.domain.dto.response.PagingResponse;
import com.bcd.ejournal.domain.dto.response.PublishResponse;
import com.bcd.ejournal.service.PublishService;

@RestController
@RequestMapping("/publish")
public class PublishApi {
    private final PublishService publishService;

    @Autowired
    public PublishApi(PublishService publishService) {
        this.publishService = publishService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublishResponse> getPublish(@PathVariable("id") Integer publishId) {
        PublishResponse response = publishService.getPublish(publishId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/search")
    public ResponseEntity<PagingResponse> searchFilter(@RequestBody PublishSearchFilterRequest request ){
    	PagingResponse responses = publishService.searchByFilter(request);
    	return new ResponseEntity<>(responses, HttpStatus.OK);
    	
    }
}
