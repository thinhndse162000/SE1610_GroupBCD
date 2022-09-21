package com.bcd.ejournal.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.PaperSubmitRequest;
import com.bcd.ejournal.domain.exception.PaperException;
import com.bcd.ejournal.service.PaperService;

@RestController
@RequestMapping(path = "/paper")
public class PaperApi {
	@Autowired
	private PaperService paperService;
	
	@PostMapping(path = "/submit")
	public ResponseEntity<?> submitPaper(@Valid @RequestBody PaperSubmitRequest model) throws Exception, PaperException {
		paperService.submitPaper(models);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
